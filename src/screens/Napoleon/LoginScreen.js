import React from "react";
import '../../App.css'
import { FcGoogle } from 'react-icons/fc';
import { FaKeybase } from 'react-icons/fa';
import { AiOutlineRight, AiOutlineLine } from 'react-icons/ai';
import { BsMicrosoft, BsGithub, BsTwitter, BsLinkedin } from 'react-icons/bs';
import { Box, Divider, Flex, Img, Text } from '@chakra-ui/react'

const NapoLoginScreen = () => {
    return (
        <Flex className="archivo" gap={'30px'} align={'center'} justify='center' mt={'auto'} mb='auto'>
            <Box textAlign={'center'}>
                <Text color={'#202020'} fontSize={'1.875rem'} fontWeight='700'>Welcome to PeepsDB</Text>
                <Text color={'#827777'} fontSize={'1.5rem'} fontWeight='500'>
                    Connect to your accounts with just a click
                </Text>
                <Flex flexDir={'column'} align='center'>
                    <Flex gap={'30px'} mt='20px'>
                        <Box p={'10px 25px'} cursor='pointer' border='1.3px solid #6D64FA' borderRadius={'10px'}>
                            <FcGoogle fontSize={'2rem'} />
                        </Box>
                        <Box p={'10px 25px'} cursor='pointer' border='1.3px solid #6D64FA' borderRadius={'10px'}>
                            <BsMicrosoft fontSize={'2rem'} />
                        </Box>
                        <Box p={'10px 25px'} cursor='pointer' border='1.3px solid #6D64FA' borderRadius={'10px'}>
                            <BsGithub fontSize={'2rem'} />
                        </Box>
                    </Flex>
                    <Flex gap={'30px'} mt='20px'>
                        <Box p={'10px 25px'} cursor='pointer' border='1.3px solid #6D64FA' borderRadius={'10px'}>
                            <FaKeybase fontSize={'2rem'} color='#0A66C2' />
                        </Box>
                        <Box p={'10px 25px'} cursor='pointer' border='1.3px solid #6D64FA' borderRadius={'10px'}>
                            <BsTwitter fontSize={'2rem'} color='#00acee' />
                        </Box>
                        <Box p={'10px 25px'} cursor='pointer' border='1.3px solid #6D64FA' borderRadius={'10px'}>
                            <BsLinkedin fontSize={'2rem'} color='#0A66C2' />
                        </Box>
                    </Flex>
                </Flex>
                <Flex 
                    align={'center'} justify='center' gap='10px' cursor={'pointer'}
                    border={'1.3px solid #6D64FA'} borderRadius='15px' w={'100%'} p='10px 0' mt='20px'
                >
                    <Text fontSize={'1.5rem'} fontWeight='600' color={'#6D64FA'}>More connections</Text>
                    <AiOutlineRight color={'#6D64FA'} />
                </Flex>
                <Flex align='center' justify={'center'}>
                    <AiOutlineLine />
                    <Text p={'20px 10px'}>OR</Text>
                    <AiOutlineLine />
                </Flex>
                <Flex align={'center'} justify='space-between' gap={'30px'}>
                    <Text fontSize={'1.375rem'} fontWeight='400'>Couldn't find connection?</Text>
                    <Text 
                        fontSize={'1.5rem'} fontWeight='600' cursor={'pointer'}
                        textDecoration={'underline'} color='#6D64FA'
                    >
                        Request connect
                    </Text>
                </Flex>
            </Box>
            <Box h={'100vh'}>
                <Divider orientation="vertical" />
            </Box>
            <Box>
                <Img src="/Assets/login-animation.svg" w={'400px'} />
            </Box>
        </Flex>
    )
};

export default NapoLoginScreen;
