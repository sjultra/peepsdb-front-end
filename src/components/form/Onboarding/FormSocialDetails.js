import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
// import { AiFillEdit } from 'react-icons/ai';
import { renderJSX } from '../../../utils/helpers';
import Btn from '../../../widgets/Button';
import Input from '../../../widgets/Input';
import TextInput from '../../../widgets/Text';
import { OnboardingContainer } from './UserForm';
import {LoginSocialLinkedin} from 'reactjs-social-login'
import { backendURL } from '../../../utils/setEnv';
import useWidget from '../../../hooks/useWidget';
import { githubAuthCall } from '../../../screens/LoginScreen';

const FormSocialDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  // loading,
  profile,
  preview
}) => {
  const {
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    skypeId,
    linkedinProfileUrl,
    calendlyProfileUrl,
    provider
  } = formData;

  const proceed = (e) => {
    console.log('form at step3',formData)
    e.preventDefault();
    nextStep();
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const {openSocialConnectPopup} = useWidget()

    

  return (
    <OnboardingContainer>

      {
        renderJSX(
          preview,
          <Flex my='0.8em' align={'center'} justify={'space-between'}>
            <TextInput variant={'s2'}>Social</TextInput>
            
            {/* <Btn px='1.2em' h='40px' variant={'fade'} rightIcon={<AiFillEdit fontSize={'14px'} />} >Edit</Btn> */}

          </Flex>,
          <></>
        )
      }


      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >
        <Input label='Twitter Profile Url' value={twitterProfileUrl}
         name='twitterProfileUrl' onChange={onChange} flex={1} 
         {...{preview}}
         />

        <Input label='Facebook Profile Url' value={facebookProfileUrl}
         name='facebookProfileUrl' onChange={onChange} flex={1} 
         {...{preview}}
         />

      </Flex>


      <Flex className="below" direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >

           <Input
             label='Skype ID'
             type="text"
             name="skypeId"
             value={skypeId}
             onChange={(e) => onChange(e)}
             flex={1}
             {...{preview}}
            />

            <Input label='Linkedin Profile Url' value={linkedinProfileUrl}
             name='linkedinProfileUrl' onChange={onChange} flex={1} 
             Sync={LoginSocialLinkedin}
             syncProps={{
                client_id:process.env['REACT_APP_LINKEDIN_CLIENT_ID'],
                client_secret:process.env['REACT_APP_LINKEDIN_CLIENT_ID'],
                scope:"openid profile email",
                discoveryDocs:"claims_supported",
                access_type:"offline",
                redirect_uri:`${backendURL}/`+process.env['REACT_APP_LINKEDIN_CALLBACK_URL'],
                onResolve:({ provider, data }) => {
                  console.log('provider',provider);
                  console.log('data',data)
                },
                onReject:err => {
                  console.log(err)
                }
             }}
             isNotProvider={true}
             {...{preview}}
            />

      </Flex>


      <Flex className="below" direction={{base:'column',lg:'row'}} gap={'2em'}  
       justify={{lg:'space-between'}} >

        <Input Sync={()=>window.open(githubAuthCall(`inapp`),'Sign in with github',"width=550,height=450")} 
         tooltipText='github' isNotProvider={provider!=='github'} 
         label='Github Profile Url' value={githubProfileUrl}
         name='githubProfileUrl' onChange={onChange} flex={1} 
         {...{preview}}
         />

        <Input label='Calendly Profile Url' value={calendlyProfileUrl}
         name='calendlyProfileUrl' onChange={onChange} flex={1} 
         {...{preview}}
        />


      </Flex>
      
      {
        renderJSX(
          !preview,
          <Flex gap='2em' mt='2em'>
            <Btn onClick={(e) => proceed(e)}>Next</Btn>
            <Btn variant={'fade'}>Back</Btn>
          </Flex>,
          <></>
        )
      }


    </OnboardingContainer>
  );
};

export default FormSocialDetails;
