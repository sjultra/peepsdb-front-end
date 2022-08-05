import React, { Fragment } from 'react';
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
    firstName:firstname,
    lastName:lastname,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
  } = formData || {};


  console.log('formdata',formData)

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const proceed = (e) => {
    e.preventDefault();

    
    const payload = {
      firstname,
      lastname,
      alias,
      skypeId,
      googleGmailId,
      appleEmailId,
      phone,
    }
    console.log('formdata',payload)

    let error ='';
    if(!Object.values(payload).every(value=>value)){
      error='All fields are reqired'
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
        position:'top'
      })
    }

    else {
      nextStep();
    }
  };

  const headingText =
    loading || !profile ? (
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
            <label htmlFor='firstname'>
              Firstname <span>*</span>
            </label>
            <input
              type='text'
              name='firstname'
              value={firstname}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

        <Box flex={1}>
          <FormControl>
            <label htmlFor='lastname'>
              Lastname <span>*</span>
            </label>
            <input
              type='text'
              name='lastname'
              value={lastname}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
        </Box>

      </Flex>
      <Flex direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >

        <Box flex={1}>
          <FormControl>
            <label htmlFor='alias'>Alias</label>
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
              value={googleGmailId}
              onChange={(e) => onChange(e)}
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
      <BtnWrapper>
        <BtnNext onClick={(e) => proceed(e)}>Next</BtnNext>
      </BtnWrapper>
    </Wrapper>
  );
};

export default FormUserDetails;
