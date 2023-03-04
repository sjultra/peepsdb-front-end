import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Background from '../assets/images/login-background.png';
import Google from '../assets/images/google-icon.png';
import Github from '../assets/images/github-icon.png';
import Microsoft from '../assets/images/microsoft-icon.png';
import { backendURL, githubClientID } from '../utils/setEnv';
import useAuthActions from '../hooks/useAuth';
// import NavLayout from '../components/layouts/NavLayout';
import { renderJSX } from '../utils/helpers';
import { Box,  Button,  Center, Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
import { FaKeybase, FaLinkedin, FaTwitter } from 'react-icons/fa';
import TextInput from '../widgets/Text';
import Btn from '../widgets/Button';
import Input from '../widgets/Input';
import {IoIosCheckmarkCircle} from 'react-icons/io'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import useConnections from '../hooks/useConnections';
import { AiOutlineRight } from 'react-icons/ai';
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
    /* margin-bottom: 1rem; */
    font-size: 3rem;

    @media (max-width: 550px) {
      font-size: 2.5rem;
    }
  }
`;

// const Socials = styled.a`
//   height: 6rem;
//   width: 35rem;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 5rem 0 4.5rem;
//   border-radius: 5rem;
//   box-shadow: 0 1px 5px #cccccc;
//   margin: 3rem 0;
//   font-size: 1.7rem;
//   cursor: pointer;

//   @media (max-width: 550px) {
//     height: 6rem;
//     width: 33rem;
//     padding: 0 4.5rem 0 4rem;
//   }

//   @media (max-width: 450px) {
//     height: 5.5rem;
//     width: 30rem;
//     padding: 0 3.2rem 0 2.7rem;
//   }

//   @media (max-width: 350px) {
//     height: 5.5rem;
//     width: 28rem;
//     padding: 0 2.8rem 0 2.3rem;
//   }

//   &:hover {
//     background: #f9f9f9;
//   }
// `;


const Socials = styled.a`
  /* height: 6rem; */
  /* width: 35rem; */
  width:80px;
  height:80px;
  border:1px solid var(--primary-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 3rem;
  font-size: 1.7rem;
  cursor: pointer;

  img{
    max-height:40px;
  }

  &:hover {
    background: #f9f9f9;
  }
`;

export const githubAuthCall = (userid)=> 
`https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${encodeURIComponent(backendURL+'/'+process.env.REACT_APP_GITHUB_CALLBACK_URL)}?path=${'/'+renderJSX(userid,userid,'')}&scope=user:email`

export const googleAuthUrl = (inapp)=>
`${backendURL}/auth/google${renderJSX(inapp,inapp,'')}`;


export const linkedinAuthUrl = (inapp='')=>{
  const baseURL ='https://www.linkedin.com/oauth/v2/authorization';
  const client_id = `client_id=${process.env['REACT_APP_LINKEDIN_CLIENT_ID']}`;
  const response_type = `response_type=code`;
  const redirect_uri = `redirect_uri=${(backendURL+'/'+process.env.REACT_APP_LINKEDIN_CALLBACK_URL)}`;
  const state=`state=${inapp}`;
  const scope = `scope=${encodeURIComponent(`r_liteprofile r_emailaddress`)}`

  const completeURL = `${baseURL}?${response_type}&${client_id}&${redirect_uri}&${state}&${scope}`

  console.log('linkedinUrl',completeURL)

  return completeURL ;

}

export const facebookAuthUrl = (inapp='')=> `${backendURL}/auth/facebook${inapp}`;

export const microsoftAuthUrl = (userid)=>`${backendURL}/auth/microsoft${renderJSX(userid,`?userid=`+userid,'')}`;

const inputStyles = 'background:white;border:1px solid var(--borders);border-radius:0.4em;margin-top:0.4em;height:40px;font-size:13px;'


const NewConnection = ({handleClose})=>{

  const [loading,setLoading] = useState(false);

  const [step,setStep]  = useState(0);

  const handleSubmit = async()=>{
    try{
      setLoading(true)
      setTimeout(() => {
        setStep(1);
        setLoading(false);
      }, 2000);

    }
    catch(err){

    }
    finally{
    }
  }

  if(!step){
    return(
      <>
        <Box p='2em'>

          <Flex justify={'center'}> 
            <TextInput variant={'s2'}>Request Connect</TextInput>
          </Flex>

          <Center mt='0.6em' fontSize={'13px'} 
          color={'var(--hash)'}>
            Enter connection information
          </Center>

          <Input mt='1em' inputStyles= {inputStyles}
            labelStyles='fontSize:13px;margin:0' label='Name' 
            placeholder='Enter your full name' 
          />

          <Input mt='1em' 
            inputStyles={inputStyles} 
            labelStyles='fontSize:13px;margin:0' label='Email address' 
            placeholder='Enter your email address'
          />

          <Input mt='1em' 
            inputStyles={inputStyles} 
            labelStyles='fontSize:13px;margin:0' label='Website name' placeholder='PeespDB' 
          />

          <Input mt='1em' 
            inputStyles={inputStyles}
            labelStyles='fontSize:13px;margin:0' label='Connection URL' placeholder='www.peepsDB.com'  />

          <Btn loading={loading} mt='2em' onClick={handleSubmit} full>Submit</Btn>

        </Box>
      </>
    )
  }
  return(
    <Box p={'1.5em'}>
      <Center mt='1.5em'>
        <IoIosCheckmarkCircle fontSize={'55px'} color='var(--primary-color)' />
      </Center>
      <Center color='var(--primary-color)' mt='0.5em' fontSize={'18px'}>Thank You! </Center>

      <Center  mt={'0.5em'} color='#333333' fontSize={'13px'}>
        You request has been successfully recorded. We're working on it!
      </Center>

      <Btn onClick={handleClose} mt='1.2em' full >Close</Btn>
    </Box>
  )
}


const LoginScreen = () => {
  // Selector

  const {auth} = useAuthActions();

  const [modalScreen,setModalScreen] = useState()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {ConnectionsModal} = useConnections()

  const handleOpen =(type)=>{
    setModalScreen(type);
    onOpen()
  }

  const handleClose = ()=>{
    setModalScreen();
    onClose()
  }





  if (auth?.token) {
    return <Redirect to='/' />;
  }


  return (
    <>

      <Modal size='2xl' isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt='1em'>
            {
              modalScreen==='new-connection'?
              <NewConnection handleClose={handleClose} />:
              modalScreen==='more-connections'?
              <>

                <ConnectionsModal view={'login'}/>


              </>:
              <></>
            }
          </ModalBody>

        </ModalContent>
      </Modal>

      <Wrapper>

        <ItemRight>
          <Box>

            <Text as='h2'>Sign in to PeepsDB</Text>
            <Center>
              <Box color='var(--hash)' >
                  Sign in with a single click
              </Box>
            </Center>

          </Box>

          <Box>

            <Grid columnGap={'2em'} templateColumns={{base:'repeat(1,1fr)',md:'repeat(2,1fr)',lg:'repeat(3,1fr)'}}>            

                <Socials href={googleAuthUrl()}>
                  <img src={Google} alt='' />
                </Socials>

                <Socials
                 href={githubAuthCall()}>
                  <img src={Github} alt='' />
                </Socials>
 
                <Socials href={microsoftAuthUrl()}>
                  <img src={Microsoft} alt='' />
                </Socials>


                <Socials href={facebookAuthUrl()}>
                  <img src={'Assets/Facebook-png.svg'} alt='' />
                </Socials>

                {/* <Socials href={'microsoftAuthUrl()'}>
                  <FaKeybase fontSize='35px' />
                </Socials> */}

                <Socials href={microsoftAuthUrl()}>
                  <FaTwitter color='#1d9bf0' fontSize='35px' />
                </Socials>


                <Socials href={linkedinAuthUrl()}>
                  <FaLinkedin color='#0a66c2' fontSize='35px' />
                </Socials>


            </Grid>
            
            {
              2+2===5 &&
              <Button onClick={()=>handleOpen('more-connections')} mt='2.5em' bg='white' h={'3.5em'} border='1px solid var(--primary-color)'  w='full' borderRadius='5px' >
                  <Text mr={'0.3em'} fontSize={'15px'} color='var(--primary-color)'>More connections</Text>
                  <AiOutlineRight fontSize={'14px'} color='var(--primary-color)' />
              </Button>
            }

            <Flex align='center' my='1.5em'>
              <Box h='1px' borderTop='1px solid var(--borders)' flex={0.49}></Box>
              <Text mx='0.4em' fontSize='15px'>OR</Text>
              <Box h='1px' borderTop='1px solid var(--borders)' flex={0.49}></Box>
            </Flex>

            <Flex align='center' justify={'space-between'}>
              <Text cursor='pointer' fontSize={'14px'}>
                Couldn't find connection?
              </Text>
              <Text 
                onClick={()=>handleOpen('new-connection')} 
                cursor={'pointer'} fontSize={'14px'} 
                color='var(--primary-color)' textDecoration={'underline'}>
                  Request Connect
              </Text>
            </Flex>

          </Box>
        </ItemRight>
      
        <ItemLeft>
          <img src={Background} alt='' />
        </ItemLeft>

      </Wrapper>
    </>
    );
};


const KeyBaseLogin = ()=>{

}

export default LoginScreen;
