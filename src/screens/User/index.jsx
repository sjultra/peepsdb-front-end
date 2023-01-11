import { Box,  Flex, IconButton, Select, Text,  useToast } from '@chakra-ui/react'
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
import { NavLink } from 'react-router-dom';
import {  BsThreeDotsVertical } from 'react-icons/bs';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';


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

const toggleUserActiveState = (isSuspended)=>isSuspended?'Enable':'Suspend'


export const UserOptions = ({userlist,user,setUser})=>{

    const {openModal,closeModal} = useWidget()


    const {_id,role,isSuspended} = user;



    return(

        <Menu>
            <MenuButton
            as={IconButton}
            py='0.4em'
            aria-label='Options'
            icon={<BsThreeDotsVertical fontSize={'16px'} />}
            variant='outline'
            />
            <MenuList>
                {
                    userlist &&
                    <MenuItem py='0.7em' >
                        <NavLink to={`/admin/user/${_id}`}>
                            View Profile
                        </NavLink>
                    </MenuItem>

                }

                <MenuItem  onClick={()=>{
                    openModal({
                    children:EditRole,
                    size:'md',
                    payload:{
                        _id,
                        role,
                        close:closeModal,
                        setUser
                    }
                    })
                }} 
                py='0.7em' >
                    Edit Role
                </MenuItem>

                <MenuItem py='0.7em' 
                 onClick={()=>openModal({
                    children:SuspendUser,
                    size:'2xl',
                    payload:{
                        _id,
                        isSuspended,
                        setUser
                    }
                 })
                    
                }>
                    {toggleUserActiveState(isSuspended)} user
                </MenuItem>
            
            </MenuList>
        </Menu>
    )


}


const SuspendUser = ({_id,isSuspended,setUser})=>{
    

    const [statusText,setStatusText] = useState(
        toggleUserActiveState(isSuspended)
    )
    
    const {closeModal,openToast}  = useWidget()

    const [loading,setLoading] = useState(false)

    const axios  = useAxios();

    
    let {updateProfile} = useTeams()

    const enableDisableUser = async ()=>{
        try{
            setLoading(true)
            let req = await axios.post('/profiles/user/status',{
                _id
            })

            let {data,status} = req;

            console.log('data response')
            
            status ===200 && openToast.success({
                description:data?.msg,
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
            
            status ===401 && openToast.fail({
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

                <Btn disabled={loading} onClick={closeModal} px={'2em'} variant='secondary'>No</Btn>
                <Btn onClick={enableDisableUser} loading={loading} px='2em'>Yes</Btn>

            </Flex>
        </Box>
    )
}


export const EditRole = ({role,_id,close,setUser})=>{


    const [defaultValue,setDefaultValue] = useState(role)

    const [loading,setLoading] = useState(false);

    const {updateProfile} = useTeams()
    
    const axios = useAxios()
    
    const {openToast} = useWidget()

    const submit = async()=>{
        try{
            setLoading(true)
            let req = await axios.post('/profiles/role/update',{
                _id,
                role:defaultValue
            });
            let {status} = req;

            status ===200 && openToast.success({
                description:'User role updated successfully'
            });

            updateProfile({
                _id,
                role:defaultValue
            });
            
            setUser(prev=>({
                ...prev,
                profile:{
                    ...prev?.profile,
                    role:defaultValue
                }
            }))
        
        
        }
        catch(err){
            console.log('error caught',err?.response)
            let { data,status } = err?.response; 
            
            status ===401 && openToast.fail({
                description:data?.msg,
            })

        }
        finally{
            setLoading(false);
        }
    }

    const onChange=e=>setDefaultValue(e?.target?.value);


    
    return(
        <Box p='1em 2em' >
            <TextInput variant={'s1'}>Edit Role</TextInput>
            
            <Select onChange={onChange} value={defaultValue} mt='1em' h='40px' fontSize={'15px'} >
                <option value='Guest'>Guest</option>
                <option value='Staff'>Freelancer</option>
                <option value='Staff'>Staff</option>
                <option value='Admin'>Admin</option>
            </Select>

            <Flex justify={'flex-end'} mt='1.5em' gap='1em'>

                <Btn disabled={loading} onClick={close} px='1.2em' fontSize={'14px'} variant={'secondary'}> Cancel</Btn>

                <Btn onClick={submit} loading={loading} 
                 px='1.2em' h='40px' fontSize={'14px'} > 
                    Submit
                </Btn>

            </Flex>

        </Box>
    )

}




const UserProfile = ({user,setUser}) => {
    
    const {profile,onboard} = user;

    // const {openModal} = useWidget()

    const {
            firstName,lastName,alias,avatar,_id,
            phone,facebookProfileUrl,appleEmailId,githubProfileUrl,LinkedInProfileUrl,
            femSlackProfile,googleGmailId,timezoneUrl,isSuspended,twitterProfileUrl
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
                         // pl='20px' 
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
                            {/* <Button
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
                            </Button> */}
                            <UserOptions user={profile} setUser={setUser} />
                        </Flex>

                    </Flex>
                </Box>
            </Box>



            <Box className='archivo' mt='4em' w={{ base: '400px', lg: '1061px' }} mx={'auto'}>

                <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='40px'>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'First name'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {firstName}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Last name'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {lastName}
                        </Text>
                    </Box>
                </Flex>


                <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='20px'>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Nickname/Alias'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {alias}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Phone number'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {phone}
                        </Text>
                    </Box>
                </Flex>


                <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='20px'>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Google Email id'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {googleGmailId}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Apple Email id'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {appleEmailId}
                        </Text>
                    </Box>
                </Flex>

                <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='20px'>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Facebook Profile Url'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {facebookProfileUrl}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Timezone url'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {timezoneUrl}
                        </Text>
                    </Box>
                </Flex>


                <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='20px'>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'FEM Slack Profile'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {femSlackProfile}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Twitter Profile Url'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {twitterProfileUrl}
                        </Text>
                    </Box>
                </Flex>


                <Flex w={{ base: '500px', lg: '700px' }} justify='space-between' mx='40px' mt='20px'>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'Github Profile Url'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {githubProfileUrl}
                        </Text>
                    </Box>
                    <Box flex={'1'}>
                        <Text fontSize={{ base: '14px', lg: '16px' }} fontWeight='400' color='#4F4A4A'>
                            {'LinkedIn Profile Url'}
                        </Text>
                        <Text fontSize={{ base: '16px', lg: '20px' }} fontWeight='500' color={'#1F1D1D'} my='20px'>
                            {LinkedInProfileUrl}
                        </Text>
                    </Box>
                </Flex>


            </Box>
        </StyledProfileContainer>
    )
}

export default UserProfile