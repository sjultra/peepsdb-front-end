import React from 'react';
import Spinner from '../components/layouts/Spinner';
import OnboardUser from '../components/form/Onboarding/UserForm';
import UserWorkspace from '../components/workspace';
import useAuthActions from '../hooks/useAuth';
import { Box, Center, Circle, Flex, Image, Text } from '@chakra-ui/react';
import {IoClose} from 'react-icons/io5'
import styled from 'styled-components';
import {deviceDetect,isMobile} from 'react-device-detect'
import Btn from '../widgets/Button';
import { BiLogOut } from 'react-icons/bi';
import useDeviceInfo from '../hooks/useDeviceInfo';
import AdminDashboard from './Admin';



const DashboardScreen = () => {
  // Selectors
  const {auth,loading,profile,logout,welcome,closeWelcome} = useAuthActions();

  const userloading =  welcome;


  // console.log('loading included value',auth);

  if(loading || !profile){
    return (
      <Flex position={'fixed'} w='100vw' h='100vh' align={'center'} justify='center' top={0} left={0}>
        <Spinner />
      </Flex>
    )
  }

  else if (!auth?.profileSetup)  return <OnboardUser />;

  else if(userloading){
    return <OnboardingModal proceed={closeWelcome} logout={logout} profile={profile}/>
  }

  else if(auth?.token && auth?.role==='Admin'){
    return <AdminDashboard />;
  }

  
  else if (auth?.token && auth.role === 'Freelancer') {
    return <UserWorkspace />;
  } 

  return <>Nothing</>

};


const DeviceContainer = styled.div`
  display:flex;
  gap:0.2em;
  p{
    font-size:18px;

    &.device{
      color:var(--primary-color);
      font-weight:500;
    }
  }

  &.second{
    margin-top:0.4em;
  }
`

// let elements = document.getElementsByClassName('.whateverClassName');

// for (const iterator of elements.length) {
//   iterator.addEventListener('click',(e)=>{
//     e.preventDefault();

//   })
// }



const OnboardingModal = ({profile,logout,proceed})=>{

  const {email,alias,firstname,lastname} =profile || {}

  const device = deviceDetect();

  const clientType = isMobile?'Mobile':'Web'

  const {} = useDeviceInfo()

  const userAlias = email || alias || (`${firstname} ${lastname}`);

  return(

    <Box p={{base:'1.2em',md:'1.5em',lg:'2em 3em'}}>
      
      <Flex justify={'flex-end'}>
          <Circle cursor={'pointer'} onClick={proceed}
           p='0.2em' size='40px'  background='rgba(1, 86, 218, 0.31)' color='var(--primary-color)'  >
            <IoClose fontSize={'30px'} color='var(--primary-color)' />
          </Circle>
      </Flex>

      <Center mt='0.5em' >
        <Box>

          <Center> 
            <Text as='h6'  fontSize='24px'>Welcome</Text> 
          </Center>

          <Center> 
            <Text as='h6' color='var(--primary-color)'  fontSize='26px'>{userAlias}</Text> 
          </Center>

          <Center>
            <Image src='/assets/welcome.svg' h={{base:'200px',lg:'250px'}} />
          </Center>

          <Center>
            <Box>


            <DeviceContainer className='second'>
              <Text className='one'>Client Info:</Text>
              <Text className='device'> {device?.browserName} {clientType} {device?.engineVersion} </Text>
            </DeviceContainer>


            </Box>
          </Center>

          <Btn onClick={proceed} w='full' full fontSize={'16px'}> Proceed </Btn>

          <Btn onClick={logout} w='full' display='flex' gap='0.4em' variant={'fade'} full >  
            <BiLogOut color='initial'/>
            <Text fontSize={'18px'} color='initial' fontWeight={500}> Logout</Text>
          </Btn>

        </Box>
      </Center>


    </Box>
  )
}

export default DashboardScreen;

