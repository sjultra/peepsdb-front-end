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

export const renderIfJSXExists = (entry,fallBack=null)=>entry?entry:fallBack

export const renderJSX = (condition,entry,fallBack=null)=>(condition)?(entry):fallBack



export const convertCamelCase = (str )=>
    str.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })


export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
    
    