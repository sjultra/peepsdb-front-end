import { Box, Button, Flex, Text, Toast, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { TbFlag3 } from 'react-icons/tb'
import styled from 'styled-components'
import useAxios from '../../hooks/useAxios'
import useTeams from '../../hooks/useTeams'
import useWidget from '../../hooks/useWidget'
import { capitalizeString } from '../../utils/helpers'
import Btn from '../../widgets/Button'
import TextInput from '../../widgets/Text'



const StyledProfileContainer = styled.div`
    
    .containerFlex{
        >div{
            min-width:120px;
            @media(min-width:800px){
                max-width:300px;

            }
        }
    }

`


const SuspendUser = ({_id,isSuspended,setUser})=>{
    

    const [statusText,setStatusText] = useState(
        toggleUserActiveState(isSuspended)
    )

    const [loading,setLoading] = useState(false)

    const axios  = useAxios();

    const toast = useToast();
    
    let {updateProfile} = useTeams()

    const enableDisableUser = async ()=>{
        try{
            setLoading(true)
            let req = await axios.post('/profiles/user/status',{
                _id
            })

            let {data,status} = req;

            console.log('data response')
            
            status ===200 && toast({
                title:'Request successful',
                description:data?.msg,
                status:'success',
                position:'top'
            })

            setStatusText(prev=>prev==='Enable'?'Suspend':'Enable')

            updateProfile({
                _id,
                isSuspended:!isSuspended
            })
            
            setUser(prev=>({
                ...prev,
                profile:{
                    ...prev?.profile,
                    isSuspended:!isSuspended
                }
            }))

        }
        catch(err){
            console.log('error caught',err?.response)
            let { data,status } = err?.response; 
            
            status ===401 && toast({
                title:'Request failed',
                description:data?.msg,
                status:'error',
                position:'top',
                isClosable:true,

            })

        }
        finally{
            setLoading(false);
        }
    }


    return(
        <Box bg='white' borderRadius={'8px'} p='1.2em 1.5em'>
            
            <TextInput variant={'s2'}>Are you sure you wish to {statusText} this user ?</TextInput>

            <Flex mt='1.2em' gap='1em' align={'flex-end'}>

                <Btn disabled={loading}  px={'2em'} variant='secondary'>No</Btn>
                <Btn onClick={enableDisableUser} loading={loading} px='2em'>Yes</Btn>

            </Flex>
        </Box>
    )
}


const toggleUserActiveState = (isSuspended)=>isSuspended?'Enable':'Suspend'


const UserProfile = ({user,setUser}) => {
    
    const {profile,onboard} = user;

    const {openModal} = useWidget()

    const {
            firstName,lastName,alias,avatar,_id,
            phone,facebookProfileUrl,appleEmailId,
            femSlackProfile,googleGmailId,timezoneUrl,isSuspended
        } = profile



    console.log('user profile',user)

    return (
        <StyledProfileContainer>
            <Box 
                w={{ base: 'full' }} border={'1px solid #ECEEEE'} 
                mt='20px' borderRadius={'12px'}
            >
                <Box 
                    bg={'#6D64FA'} h={{ base: '140px', lg: '168px' }} w={{ base: 'full' }}
                    borderRadius={'12px'}
                ></Box>
                <Box 
                    px='30px' mt='-80px' align='flex-end'
                >
                    <Flex 
                        justify={'center'} align='center' bgColor={'#FAFAFA'} 
                        w='139px' h='139px' borderRadius={'50%'}
                    >
                        <FaRegUser color='#8F9092' size={'50px'} />
                    </Flex>
                    <Flex justify={'space-between'} my='1em'> 

                        <Box
                                className='archivo' fontWeight={'700'} fontSize={{ base: '20px', lg: '32px' }} 
                                pl='20px' 
                            >
                                { capitalizeString(firstName)} {capitalizeString(lastName)}
                                <Text className='archivo' fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#384A62'}>
                                    {alias}
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
                                onClick={()=>openModal({
                                    children:SuspendUser,
                                    size:'2xl',
                                    payload:{
                                        _id,
                                        isSuspended,
                                        setUser
                                    }
                                })}
                                
                            >
                                {toggleUserActiveState(isSuspended)}
                            </Button>
                        </Flex>

                    </Flex>
                </Box>
            </Box>
            <Box className='archivo' mt='4em' w={{ base: '400px', lg: '1061px' }} mx={'auto'}>
                <Flex w={{ base: '400px', lg: '600px' }} justify={'space-between'} px='50px' mt='20px'>
                    <Flex flexDir={'column'} gap='20px'>
                        <Box minW={'120px'}>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                First Name
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {firstName}
                            </Text>
                        </Box>
                        <Box minW={'120px'}>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Nickname/alias
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {alias}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex flexDir={'column'} gap='20px'>
                        <Box minW={'120px'}>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Last Name
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {lastName}
                            </Text>
                        </Box>
                        <Box minW={'120px'}>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Phone number
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {phone}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
                
                <Flex w={{ base: '400px', lg: '600px' }} justify={'space-between'} px='50px' mt='20px'>
                    <Flex className='containerFlex'  flexDir={'column'} gap='20px'>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Google gmail ID
                            </Text>
                            <Text 
                                fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}
                            >
                                {googleGmailId}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Facebook profile URL
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {facebookProfileUrl}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex className='containerFlex'  flexDir={'column'} gap='20px'>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Apple Email ID
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {appleEmailId}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Timezone URL
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {timezoneUrl}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>    

                <Flex className='containerFlex'  w={{ base: '400px', lg: '600px' }} justify={'space-between'} px='50px' mt='20px'>
                    <Flex flexDir={'column'} gap='20px'>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                FEM Slack profile
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                {femSlackProfile}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Facebook profile URL
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Linkedin profile URL
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                    </Flex>
                    
                    <Flex flexDir={'column'} gap='20px'>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Twitter profile URL
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Github profile URL
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                +2349023421755
                            </Text>
                        </Box>
                    </Flex>

                </Flex>    

                <Flex className='containerFlex' w={{ base: '400px', lg: '600px' }} 
                 justify={'space-between'} px='50px' mt='20px'>
                    <Flex flexDir={'column'} gap='20px'>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Bank name
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Bank address
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Account number
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                    </Flex>
                    <Flex flexDir={'column'} gap='20px'>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Routing number
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                Shola
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight={'400'} fontSize={{ base: '15px', lg: '15px' }} color={'#4F4A4A'}>
                                Account type
                            </Text>
                            <Text fontWeight={'500'} py='20px' fontSize={{ base: '16px', lg: '18px' }} color={'#1F1D1D'}>
                                +2349023421755
                            </Text>
                        </Box>
                    </Flex>
                </Flex>    
            </Box>
        </StyledProfileContainer>
    )
}

export default UserProfile