import { Flex, Text } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"
import { useHistory } from "react-router-dom"


const useGoBack = ({fontSize,color,mt,goBack})=>{
    const history = useHistory()


    const goBackFn = ()=>{

        return(
            <Flex mt={mt || '1.5em'} align='center' >
                <BsArrowLeft cursor={'pointer'}  color={color || 'initial'} 
                 onClick={()=>{
                    if (goBack) goBack()
                    else{
                        history.goBack()
                    }
                }} fontSize={fontSize ||'25px'}/>
                <Text ml='0.5em'>Back</Text>
            </Flex>
        )
    }

    return goBackFn()
}


export default useGoBack;