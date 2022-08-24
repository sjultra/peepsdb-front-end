import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Redirect } from 'react-router-dom';
import Background from '../assets/images/login-background.png';
import Google from '../assets/images/google-icon.png';
import Github from '../assets/images/github-icon.png';
import Microsoft from '../assets/images/microsoft-icon.png';
import { backendURL, githubClientID } from '../utils/setEnv';
import useAuthActions from '../hooks/useAuth';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import TextInput from '../widgets/Text'
import { FormControl } from '../components/form/FormResources';
import InputElement from '../widgets/Input';
import Btn from '../widgets/Button';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 90vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }

  img {
    @media (max-width: 1400px) {
      width: 51.5rem;
      height: 55rem;
    }

    @media (max-width: 1300px) {
      width: 46.5rem;
      height: 50rem;
    }

    @media (max-width: 1200px) {
      width: 41.5rem;
      height: 45rem;
    }

    @media (max-width: 1000px) {
      width: 36.5rem;
      height: 40rem;
    }
  }
`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 3rem;
    font-size: 3rem;

    @media (max-width: 550px) {
      font-size: 2.5rem;
    }
  }
`;

const Socials = styled.a`
  height: 6rem;
  /* width: 35rem; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.8rem;
  border-radius: 1.5rem;
  border:1px solid var(--primary-color);
  margin: 3rem 0;
  font-size: 1.7rem;
  cursor: pointer;

  @media (max-width: 550px) {
    height: 6rem;
    width: 33rem;
    padding: 0 2.5rem;
  }

  @media (max-width: 450px) {
    height: 5.5rem;
    width: 30rem;
    padding: 0 2.5rem;
  }

  @media (max-width: 350px) {
    height: 5.5rem;
    width: 28rem;
    padding: 0 2.5rem;
  }

  &:hover {
    background: #f9f9f9;
  }
`;

const HomeScreen = () => {
  // Selector

  const {auth} = useAuthActions();

  const [homeState,setHomeState] = useState('login');


  // Redirect if logged in
  if (auth?.token) {
    console.log('redirecting after login')
    return <Redirect to='/' />;
  }

  const backendUrl = backendURL;


  // console.log('envs',backendURL+'/'+process.env.REACT_APP_GITHUB_CALLBACK_URL,)

  const toggleScreen = ()=>setHomeState(prev=>prev==='login'?'signup':'login')

  return (
    <Wrapper>
      <ItemRight>
        <Text as='h4' fontSize={'28px'} fontWeight={500}>  
          Welcome to PeepsDB
        </Text>
        <Center mt='0.2em' color='var(--hash)' fontWeight={500} fontSize='18px'>Get started today</Center>

        <Box minW={{lg:'400px'}}>

          <Flex mt='0.5em' justify='space-between'>

            <Socials href={`${backendUrl}/auth/google`}>
              <img src={Google} alt='' />
            </Socials>

            <Socials
            href={`https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${encodeURIComponent(backendURL+'/'+process.env.REACT_APP_GITHUB_CALLBACK_URL)}?path=/&scope=user:email`}>
              <img src={Github} alt='' />
            </Socials>

            <Socials href={`${backendUrl}/auth/microsoft`}>
              <img src={Microsoft} alt='' />
            </Socials>

          </Flex>

          <Flex my='0.5em' w='full' align='center'>

            <Box h='2px' borderBottom='1px solid var(--hash)' width={'48%'}></Box>
            <Box px='5px'>
              <TextInput variant='s2'>OR</TextInput>
            </Box>
            <Box h='2px' borderBottom='1px solid var(--hash)' width={'48%'} fontSize='1px'>a</Box>

          </Flex>

          {homeState==='login'?
           
           <Login setHomeState={toggleScreen}/>:
           <Signup setHomeState={toggleScreen}/>
          }


        </Box>



      </ItemRight>
      <ItemLeft>
        <img src={Background} alt='' />
      </ItemLeft>

    </Wrapper>
  );
};


const Login = ({setHomeState})=>{

  return(
    <>
      <InputElement labelStyles={'margin-top:0.5em'} label={'Email/Alias'} name='firstName' containerStyles={'margin-top:0.5em'}  />

      <InputElement labelStyles={'margin-top:0.5em'} label={'Password'} type='password' name='password' containerStyles={'margin-top:0.8em'}  />

      <Flex justify={'flex-end'} mt='0.5em'>
        <Text fontSize={'14px'} color='var(--primary-color)'>
          <NavLink to='/forgot-password'>Forgot password</NavLink>
        </Text>
      </Flex>

      <Btn mt='1.1em'>Sign In</Btn>
      <Flex mt='1em' >
        <Text>Don't have an account?</Text>
        <Text cursor={'pointer'} onClick={setHomeState} color='var(--primary-color)' ml={'0.2em'}>
          Sign up
        </Text>
      </Flex>

    </>


  )

}


const Signup =({setHomeState})=>{
  return(
    <>
    <InputElement labelStyles={'margin-top:0.5em'} label={'Email'} name='firstName' containerStyles={'margin-top:0.5em'}  />

    <InputElement labelStyles={'margin-top:0.5em'} label={'Password'} type='password' name='password' containerStyles={'margin-top:0.8em'}  />

    <InputElement labelStyles={'margin-top:0.5em'} label={'Confirm Password'} type='password' name='password' containerStyles={'margin-top:0.8em'}  />

    <Btn mt='2.2em'>Sign up</Btn>
    <Flex mt='1em' >
      <Text>Already have an account?</Text>
      <Text cursor='pointer' onClick={setHomeState} color='var(--primary-color)' ml={'0.2em'}>
        Sign in
      </Text>
    </Flex>

    </>
    

  )
}

export default HomeScreen;
