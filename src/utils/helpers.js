export let capitalizeString = (string)=>{

    let stringArr = ''

    if(string){
        stringArr = string.split('')
        let char0 = stringArr[0]
        stringArr[0] = char0.toUpperCase();
        stringArr = stringArr.join('')
    }

    return stringArr;

}


export const convertCamelCase = (str )=>
    str.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })