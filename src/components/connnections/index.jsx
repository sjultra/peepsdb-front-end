import { Box, Center, Flex, Text } from "@chakra-ui/react"


const ConnectWidget =({type,user})=>{


    const {email,alias} =user

    const username = email || alias

    return(
        <Box borderRadius={'12px'}>

            <Box p='1em 0.5em'>
                <Center>
                    <Flex>                    
                        <Text> Hello,</Text>
                        <Text mx='0.2em' fontWeight={500}>{username} </Text>

                        <Flex justify={'space-between'} >
                            <Text fontSize={'14px'}></Text>
                            
                            <Text color={'var(--primary-color)'} textDecoration={'underline'}> 
                                Skip
                            </Text>

                        </Flex>
                    </Flex> 
                </Center>

            </Box>



        </Box>
    )
}


export default ConnectWidget;