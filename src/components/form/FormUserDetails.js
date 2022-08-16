import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { Wrapper, PrimaryHeading, FormControl, BtnNext } from './FormResources';
import {Box, Flex, useToast} from '@chakra-ui/react'


const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

const Required = styled.div`
  span {
    color: #ff0000;
  }
`;

const FormUserDetails = ({
  nextStep,
  onChange,
  formData,
  loading,
  profile,
}) => {

  const toast = useToast();

  const {
    firstName,
    lastName,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    microsoftEmailId
  } = formData || {};


  useEffect(()=>{
    navigator.geolocation.watchPosition((position)=>{
      console.log('position coordinates watched',position.coords)
    })
  },[])


  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const proceed = (e) => {
    e.preventDefault();

    
    const payload = {
      firstName,
      lastName,
      alias,
      // skypeId,
      googleGmailId,
      // appleEmailId,
      phone,
    }

    console.log('formdata',payload)

    let error ='';
    if(!Object.values(payload).every(value=>value)){
      error='Please enter all required fields'
    }
    else if (!validateEmail(googleGmailId)) {
      error= ('Invalid email')
    } 
    else if (!googleGmailId.endsWith('@gmail.com')) {
      error=('Gmail address please');
    } 

    console.log('error',error)
    if (error){
      console.log('toast notif',error,)
      toast({
        title:'Error',
        description:error,
        status:'error',
        position:'top',
        isClosable:true
      })
    }

    else {
      nextStep();
    }
  };

  const headingText =
    loading || !profile?.profileSetup ? (
      <span className='text-primary'>Registration</span>
    ) : (
      <Fragment>
        <span className='text-primary'>Edit </span> Profile
      </Fragment>
    );

  return (
    <Wrapper>
      <PrimaryHeading className='text-center '>{headingText}</PrimaryHeading>
      <Required>
        required<span> * </span>
      </Required>

      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >


        <Box flex={1}>

          <FormControl>
            <label htmlFor='firstName'>
              First Name <span>*</span>
            </label>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

        <Box flex={1}>
          <FormControl>
            <label htmlFor='lastName'>
              Last Name <span>*</span>
            </label>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

      </Flex>
      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >

        <Box flex={1}>
          <FormControl>
            <label htmlFor='alias'>Alias <span>*</span> </label>
            <input
              type='text'
              name='alias'
              value={alias}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

        <Box flex={1}>    
          <FormControl>
            <label htmlFor='skypeId'>SkypeId</label>
            <input
              type='text'
              name='skypeId'
              value={skypeId}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

      </Flex>

      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >
        <Box flex={1}>
          <FormControl>
            <label htmlFor='googleGmailId'>
              Google Gmail Id <span>*</span>
            </label>
            <input
              type='email'
              name='googleGmailId'
              {...formData?.provider==='google'?{placeholder:googleGmailId}:{value:googleGmailId} }
              onChange={(e) => onChange(e)}
              {...formData?.provider==='google'?{disabled:true}:{}}
            />
          </FormControl>
        </Box>

        <Box flex={1}>
          <FormControl>
            <label htmlFor='appleEmailId'>Apple Email Id</label>
            <input
              type='email'
              name='appleEmailId'
              value={appleEmailId}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

      </Flex>
      
      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >

        <Box flex={1}>
            <FormControl>
              <label htmlFor='phone'>
                Microsoft email
              </label>
              <input
                type='string'
                name='microsoftEmailId'
                {...formData?.provider==='microsoft'?{placeholder:microsoftEmailId}:{value:microsoftEmailId} }
                onChange={(e) => onChange(e)}
                {...formData?.provider==='microsoft'?{disabled:true}:{}}
                />
            </FormControl>
        </Box>

        <Box flex={1}>
            <FormControl>
              <label htmlFor='phone'>
                Phone <span>*</span>
              </label>
              <input
                type='number'
                name='phone'
                value={phone}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
        </Box>

      </Flex>


      <BtnWrapper>
        <BtnNext onClick={(e) => proceed(e)}>Next</BtnNext>
      </BtnWrapper>
    </Wrapper>
  );
};

export default FormUserDetails;
