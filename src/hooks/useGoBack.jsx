import { Flex, Text } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"
import { useHistory } from "react-router-dom"


const useGoBack = ({fontSize,color,mt,goBack})=>{
    const history = useHistory()


    const goBackFn = ()=>{

        return (
          <Flex
            cursor={"pointer"}
            color="var(--primary-color)"
            mt={mt || "1.5em"}
            align="center"
            onClick={() => {
              if (goBack) goBack();
              else {
                history.goBack();
              }
            }}>
            <BsArrowLeft
              fontSize={fontSize || "2rem"}
            />
            <Text ml="0.5em">Back</Text>
          </Flex>
        );
    }

    return goBackFn()
}


export default useGoBack;