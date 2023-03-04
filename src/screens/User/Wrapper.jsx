import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { TbFlag3 } from 'react-icons/tb'

const UserWrapper = () => {
    const profileStyle = (title1, title1El, title2, title2El) => {
        return (
            <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='40px'>
                <Box flex={'1'}>
                    <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                        {'text1'}
                    </Text>
                    <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                        {'text2'}
                    </Text>
                </Box>
                <Box flex={'1'}>
                    <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                        {'title3'}
                    </Text>
                    <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                        {'title4'}
                    </Text>
                </Box>
            </Flex>
        )
    }

    return (
        <Box p={{ base: '5px 5px', lg: '0 50px' }}>
            <Box 
                h={{ base: '260px', lg: '310px' }} w={'100%'} border={'1px solid #ECEEEE'} 
                borderRadius={'12px'}
            >
                <Box 
                    bg={'#6D64FA'} h={{ base: '140px', lg: '168px' }}
                    borderRadius={'12px'}
                ></Box>
                <Flex 
                    px='30px' mt='-80px' justify={'space-between'} align='flex-end'
                >
                    <Box>
                        <Flex 
                            justify={'center'} align='center' bgColor={'#FAFAFA'} 
                            w='139px' h='139px' borderRadius={'50%'}
                        >
                            <FaRegUser color='#8F9092' size={'50px'} />
                        </Flex>
                        <Text
                            className='archivo' fontWeight={'700'} fontSize={{ base: '20px', lg: '32px' }} 
                            pl='20px' mt={{ base: '-20px', lg: '-32px' }}
                        >
                            Iben rodriguez
                            <Text className='archivo' fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#384A62'}>
                                Ibenrodi@gmail.com
                            </Text>
                        </Text>
                    </Box>
                    <Flex 
                        align={'center'} gap={{ base: '15px', lg: '60px' }} 
                        flexDir={{ base: 'column', lg: 'row' }}
                    >
                        <Flex color='#142F7D' align='center' gap={'10px'}>
                            <TbFlag3 size={'24px'} />
                            <Text fontSize={{ base: '15px', lg: '15px' }}>View Logs</Text>
                        </Flex>
                        <Button
                            bgColor={'#6D64FA'} color='#fff' fontSize={'16px'} p='15px 20px'
                            _hover={{ opacity: 1 }}
                        >
                            Suspend
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <Box className='archivo' w={'100%'} mt='50px'>
                {profileStyle("First Name", "Shola", "First Name", "Shola")}
                {profileStyle("Nickname/Alias", "Shola", "Phone number", "+2349023421755")}
                {profileStyle("Google gmail ID", "ibenrodri@gmail.com", "Apple Email ID", "Shola")}
                {profileStyle("Facebook profile url", "Shola", "Timezone url", "+2349023421755")}
                {profileStyle("FEM Slack profile", "Shola", "Twitter profile url", "Shola")}
                {profileStyle("Facebook profile url", "Shola", "Github profile url", "+2349023421755")}
                {profileStyle("Linkedin profile url", "Shola")}
            </Box>
        </Box>
    )
}

export default UserWrapper