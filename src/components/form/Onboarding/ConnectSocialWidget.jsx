import { Box, Flex } from "@chakra-ui/react";
import {GrClose} from 'react-icons/gr';
import useWidget from "../../../hooks/useWidget";
import { backendURL } from "../../../utils/setEnv";
// import {useRef} from 'react'

const ConnectSocialWidget = ({payload})=>{

    const {closeModal} = useWidget();

    const {url,customUrl} = payload;

    // const baseUrl = backendURL;

    // const windowObjectRef = useRef(window);


    return(
        <Box 
        //  maxW={{base:'90%',md:'65%',lg:'500px'}} 
         borderRadius={'5px'}  >
            <Flex borderTopRadius={'5px'} borderTop={'5px'} bg='var(--primary-color)'
             p='1em 0.5em' justify='flex-end' >
                <GrClose onClick={closeModal} 
                 cursor='pointer' fontSize={'18px'} 
                 color='white'
                />
            </Flex>

            <iframe src={customUrl || `${backendURL}/${url}`} 
             width={'100%'} height='500px'>
        
            </iframe>

        </Box>
    )
}

export default ConnectSocialWidget