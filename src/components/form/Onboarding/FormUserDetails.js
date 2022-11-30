import React, {   useState } from 'react';
import styled from 'styled-components';
import {Box, Divider, Flex,  Square, Text, useToast} from '@chakra-ui/react'
import InputElement from '../../../widgets/Input';
import {HiOutlineUser} from 'react-icons/hi'
import Btn from '../../../widgets/Button';
import FileInputComponent, { RenderFileImage } from '../../../widgets/FileInputComponent';
import { fileToBase64, renderJSX } from '../../../utils/helpers';
import TextInput from '../../../widgets/Text';


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
  previewMode,
  openConnections,
}) => {

  const toast = useToast();


  const {
    firstName,
    lastName,
    alias,
    // skypeId,
    // googleGmailId,
    // appleEmailId,
    phone,
    // microsoftEmailId,
    avatar
  } = formData || {};


  const proceed = (e) => {
    e.preventDefault();  
    const payload = {
      firstName,
      lastName,
      alias,
      avatar,
      phone,
    }

    console.log('formdata',payload)

    let error ='';
    if(!Object.values(payload).every(value=>value)){
      error='Please enter all required fields'
    }
    // else if (!validateEmail(googleGmailId)) {
    //   error= ('Invalid email')
   
    // } 
    // else if (!googleGmailId.endsWith('@gmail.com')) {
    //   error=('Gmail address please');
    // } 

    // console.log('error',error)
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
      console.log('formData at step1',formData);
      nextStep(payload);
    }
  };


  const [state,setState] = useState({
    alias:''
  })

  const set = e=>setState(prev=>({...prev,[e.target.name]:e.target.value}))

  return (
      <Box>
            <Flex my='0.2em' align={'center'} justify={ 'flex-end'}>
              {/* {
                renderJSX(
                  previewMode,
                  <TextInput variant={'s2'}></TextInput>
                )
              } */}

              <Btn px='1em' onClick={openConnections}>
                My Connections
              </Btn>


            </Flex>
        {/* <PrimaryHeading className='text-center '>{headingText}</PrimaryHeading> */}
        <Required>
          <span> * </span>
        </Required>
        

        <Flex align='center' direction={{base:'column',lg:'row'}} gap='1.5em'>
          <Square mt='0.5em' size='100px' background={'rgba(214, 216, 220, 0.2)'}
          borderRadius={'15px'}>
            {RenderFileImage(
              avatar,
            <HiOutlineUser color='#8F9092' fontSize={'40px'}/>
            )}
          </Square>

          <Box>
            <Text fontWeight={500}>Choose your profile image </Text>
            <Flex gap='1em'> 
              <FileInputComponent
              setOnChange={async(file)=>{

                let stringAvatar =await  fileToBase64(file);
                sessionStorage.setItem('fileType',file.type)
                let e = {
                  target:{
                    name:'avatar',
                    value:stringAvatar
                  }
                }
                onChange(e)
              }}
              icon={
                <Btn pointerEvents='none' w='1em' mt={'1em'} fontSize={'11px'} h='32px' borderRadius='8px' 
                variant={'secondary'}>
                  Select Avatar
                </Btn>
  
              }
              />

              <Btn mt='1em' onClick={()=>{
                let e = {
                  target:{ name:'avatar', value:''}
                }
                onChange(e)}} 
                w='1em' textDecoration='underline' 
                color='red' fontSize={'11px'} h='32px' borderRadius='8px' 
                variant={'fade'}
              >
                Delete
              </Btn>

            </Flex>

            
          </Box>


        </Flex>

        {previewMode?
        <Divider py='1em' />:<></>
        }


        <Flex mt='2em' direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >

          <InputElement preview={previewMode} fontSize='15px' flex={1} label={'First name'} required 
          name='firstName' value={firstName} onChange={onChange} />

          <InputElement preview={previewMode} fontSize='15px' flex={1} label={'Last name'} required 
          name='lastName' value={lastName} onChange={onChange} />

        </Flex>

        <Flex mt='1.5em' direction={{base:'column',lg:'row'}} gap={'2em'}  justify={{lg:'space-between'}} >

          <InputElement preview={previewMode} fontSize='15px' flex={1} label={'Alias'} required 
          name='alias' value={alias} onChange={onChange} />

          <InputElement preview={previewMode} fontSize='15px' flex={1} label={'Phone number'} required 
          name='phone' value={phone} onChange={onChange} />

          {/* <Box flex={1}>    
            <FormControl>
              <label htmlFor='skypeId'>SkypeId</label>
              <input
                type='text'
                name='skypeId'
                value={skypeId}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </Box> */}
          
        </Flex>
        
        {
          renderJSX(
            previewMode,
            <></>,
            <Flex gap='2em' mt='2em'>
              <Btn onClick={(e) => proceed(e)}>Next</Btn>
              {/* <Btn variant={'fade'}>Clear</Btn> */}
            </Flex>
          )
        }
      </Box>
  );
};

export default FormUserDetails;

