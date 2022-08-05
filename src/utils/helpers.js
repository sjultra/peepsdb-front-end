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
