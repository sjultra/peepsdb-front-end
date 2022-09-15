
const { useToast } = require("@chakra-ui/react")



const useValidate = ()=>{


    const toast = useToast();
        
    const isRequired= (payload,include0 = false)=>{
        let error = ''

        console.log('is required payload',payload)
        if( !(payload.every(value=> include0?  (value || value === 0 ) : value)) ) {
            error= ('Please enter all required fields');
        };
        
        error &&       
        toast({
            title:'Error',
            description:error,
            status:'error',
            position:'top',
            isClosable:true
        })
        return error   
    }

    const validateConditions  =(conditions,messages)=>{
        let failedCondition =conditions.findIndex(condition=> !condition);

        let error = '';

        if (failedCondition >-1){
            error =messages[failedCondition];
            console.log('failed connection',failedCondition,error)

            toast({
                title:'Error',
                description:error,
                status:'error',
                position:'top',
                isClosable:true
            })
    
            // toast({
            //  title:'Error',
            //  description:error,
            //  status:error,
            //  position:'top',
            //  isClosable:true
            // })   
        } 
        
        return error;
    }

    return {
        isRequired,
        validateConditions,
    }


}


export default useValidate;