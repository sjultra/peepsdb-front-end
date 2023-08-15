const git = require("simple-git").default();
const readLine = require('readline');

const maybePluralize = (count, noun, suffix = "s") => `${noun}${count !== 1 ? suffix : ""}`;

async function main( ){
    try{
        const status = await git.status();
        const {files} = status;
        const stagingArr = files

        let commitMessage = 'Commit before pull';
        
        const outputChangeStr = ({changes,insertions,deletions})=>
        changes===0 && insertions===0 && deletions===0?'Everything up to date':
        `${changes} ${maybePluralize(changes,'change')},${insertions} ${maybePluralize(insertions,'insertion')} ,${deletions} ${maybePluralize(deletions,'deletion')}(-)`


        const commitAndPull = async function (string=undefined) {
            try{
                commitMessage = string || commitMessage
                let routesToAdd =stagingArr.map(entry=>`./${entry.path}`)
                await git.add(routesToAdd).commit(commitMessage,(err,result)=>{
                  if(err){
                    err && console.log('error occured',err);               
                  }
                  else if(files.length){
                    const {branch,summary} = result  
                    const {deletions,changes,insertions} = summary;

                    console.log(`[${branch}] ${commitMessage}\n${outputChangeStr({changes,insertions,deletions})}`);

                  }
                })
                .pull('origin','dev-1',undefined,(err,pullResult)=>{
                    if(err){

                      // console.log('err name',err.name);

                      console.log(err.message)


                    }
                    else{
                      const {summary} = pullResult

                      const {changes,insertions,deletions} = summary;
                      console.log('changes pulled successfully\n',
                      changes===0 && insertions===0 && deletions===0?'Everything up to date':
                      outputChangeStr({insertions,deletions,changes}))
                    }
                })
            }
            catch(err){
              throw Error('Error caught')
              // console.log('catching errors in commitpull',err)
              
            }

          
        }

        if (stagingArr.length){          
          // create empty user input
          const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          rl.question("You have untracked changes. Please add a commit message\n",(string)=>{

              commitAndPull(string)
              rl.close();
              
            }

          )
          // close input stream
        }
        else {
          commitAndPull()
        }    
    }
    catch(err){

        console.log('an error occured',err)

    }


    
} 


main()