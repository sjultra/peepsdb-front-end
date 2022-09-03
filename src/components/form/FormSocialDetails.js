import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Btn from '../../widgets/Button';
import Input from '../../widgets/Input';
import {
  Wrapper,
  PrimaryHeading,
  FormControl,
  BtnWrapper,
  BtnPrev,
  BtnNext,
} from './FormResources';

const FormSocialDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
}) => {
  const {
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
  } = formData;

  const proceed = (e) => {
    e.preventDefault();
    nextStep();
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Box>

      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >
        <Input label='Twitter Profile Url' value={twitterProfileUrl}
         name='twitterProfileUrl' onChange={onChange} flex={1} 
        />

        <Input label='Facebook Profile Url' value={facebookProfileUrl}
         name='facebookProfileUrl' onChange={onChange} flex={1} 
        />

      </Flex>


      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >
        <Input label='Twitter Profile Url' value={twitterProfileUrl}
         name='twitterProfileUrl' onChange={onChange} flex={1} 
        />

        <Input label='Linkedin Profile Url' value={linkedinProfileUrl}
         name='linkedinProfileUrl' onChange={onChange} flex={1} 
        />

      </Flex>


      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  
       justify={{lg:'space-between'}} >
        <Input label='Calendly Profile Url' value={calendlyProfileUrl}
         name='calendlyProfileUrl' onChange={onChange} flex={1} 
        />

        <Box flex={1}></Box>

      </Flex>

      <Flex gap='2em' mt='2em'>
        <Btn onClick={(e) => proceed(e)}>Next</Btn>
        <Btn variant={'fade'}>Back</Btn>
      </Flex>


    </Box>
  );
};

export default FormSocialDetails;
