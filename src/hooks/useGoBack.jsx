import { Flex, Text } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"
import { useHistory } from "react-router-dom"

const useGoBack = ({ fontSize, color, mt, goBack, title }) => {
  const history = useHistory()

  const goBackFn = () => {
    return (
      <Flex
        color="var(--primary-color)"
        mt={mt || "1.5em"}
        align="center"
        justify={"space-between"}>
        <Flex
          cursor={"pointer"}
          align="center"
          onClick={() => {
            if (goBack) goBack()
            else {
              history.goBack()
            }
          }}>
          <BsArrowLeft fontSize={fontSize || "2rem"} />
          <Text ml="0.5em">Back</Text>
        </Flex>
        <Text noOfLines={1} fontWeight={"semibold"}>{title ? title : ""}</Text>
      </Flex>
    )
  }

  return goBackFn()
}

export default useGoBack
