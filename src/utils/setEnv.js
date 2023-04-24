export const githubClientID = process.env[`REACT_APP_GITHUB_${process.env.NODE_ENV==='production'?'':'TEST_'}CLIENT_ID`]

export const backendURL = process.env[`REACT_APP_BACKEND_URL`]


export const RETURN_EMAIL_HIERARCHY = ()=>{

    const emailObjectValues = {};
    
    const emailHierArchies = process.env['REACT_APP_EMAIL_SUFFIXES'];

    const split = emailHierArchies?.split?.(' ');

    console.log('hierarchies and split',emailHierArchies,split)
    
    split?.forEach((entry,index)=>{
      emailObjectValues[`email${index+1}`] = entry;
    });
    
    return {
      values:emailObjectValues,
    }
  
  }
  