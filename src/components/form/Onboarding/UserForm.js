import React, { useState, useEffect,} from 'react';
import FormUserDetails from './FormUserDetails';
import FormWorkDetails from './FormWorkDetails';
import FormSocialDetails from './FormSocialDetails';
import Confirm from './Confirm';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Circle, Center, Square, Flex } from '@chakra-ui/react'
import {  renderJSX } from '../../../utils/helpers';
import {GiCheckMark} from 'react-icons/gi'
// import Payment from './Payment';
// import useWidget from '../../../hooks/useWidget';
import NavLayout from '../../layouts/NavLayout';
import styled from "styled-components";
import useConnections from '../../../hooks/useConnections.jsx'
import useWidget from '../../../hooks/useWidget';
// import ConnectWidget from '../../connnections';
import { GoogleOAuthProvider } from '@react-oauth/google';




const UserForm = ({ profile, loading }) => {
 
  const [formData, setFormData] = useState({
    firstName: '',avatar:'',lastName: '',
    alias: '',skypeId: '',paymentMethod:'payoneer',
    googleGmailId: '',appleEmailId: '',microsoftEmailId:'', 
    phone: '',timeZoneUrl: '',daysPerWeek: 4,
    hoursPerDay: '',localCurrencyUrl: '',femSlackProfileUrl: '',
    startDate: '',paymentProfileUrl: '',paymentEmail:'', 
    twitterProfileUrl: '',facebookProfileUrl: '',githubProfileUrl: '',
    linkedinProfileUrl: '',calendlyProfileUrl: '',provider:profile?.provider,
    bankName:'',accountNumber:'',accountType:'',
    routing:'',paymentType:'',   
  });

  const {openModal,closeModal} = useWidget();



  const {
    connectionsRef:windowRef,
    githubConnect,linkedinConnect,ConnectionsModal
  } = useConnections();




  useEffect(() => {
   profile &&  setFormData(prev=>({...prev,...profile}));
  }, []);

  useEffect(()=>{
    window.addEventListener('message',e=>{
      if(e.origin === 'http://localhost:5000') {
        // console.log('message caught',e.origin,e.data)
        if(windowRef?.current?.close){
          let profileData = e.data;

          const initPayload  = JSON.parse(profileData);

          openConnections(initPayload);

          windowRef.current?.close && windowRef.current.close()
        }
      }
      // console.log('event data',e.data)
    })
    return window.removeEventListener('message',window)
  },[])

  const openConnections =(initPayload=false)=>{

    const payload={
      view:'onboarding',
      padd:true,
      setValues: (values,selected)=>{ 
        let payload = {}
        for (const key in values) {
          if(selected.includes(key)) {
            payload[key] = values[key]
          }
        }
        setFormData(payload)
      },
      close:closeModal,
      ...initPayload && !initPayload?.target ?{initPayload}:{}   
    }

    console.log('final payload',payload);

    openModal({
      children:ConnectionsModal,
      size:'xl',      
      isOpen:true,
      payload,
    })

  }
  

  useEffect(()=>{
    openConnections()
  },[])

  const [step, setStep] = useState(0);
  // company: loading || !profile.company ? '' : profile.company,

  const onChange = (e,type='text') =>{

    setFormData({
      ...formData,
      [e.target.name]:  type =='number'?parseInt(e.target.value)  : e.target.value,
    });
  }

  const setValue = (name,value)=>{
    setFormData({
      ...formData,
      [name]: value,
    }) 
  }

  // Proceed to next step
  const nextStep = (payload) => {
    setFormData({...formData,...payload})
    setStep(step + 1);
  };


  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };



  return(
    <GoogleOAuthProvider clientId={process.env['REACT_APP_GOOGLE_CLIENT_ID']}>
      <NavLayout>
        {
          step < 3?
          <Tabs as='form' index={step} onChange={(index)=>setStep(index)}  orientation='vertical'>

            <TabList py={10} justifyContent='flex-start' ml={{lg:'5rem'}} position={'fixed'}  top='8rem' left={0} borderLeft={'none'}>
              {/* <Text fontSize={'15px'} fontWeight={500} mb={'1em'}>Onboarding guide</Text> */}
              <Center>
                <Box>

                  {
                    [0,
                     1,2,
                    // 'Payment'
                    ].map((index)=>{

                      const activeLineColor = index===step?'var(--primary-color)':'#EFF0F7';
                      return(
                        <Tab key={index}  minW={'80px'} justifyContent={'center'} borderLeft={'none'}>
                          <Box  >
                            {
                              renderJSX(
                                index ,
                                <Center>                  
                                  <Box borderRight={`2px solid ${activeLineColor}`} 
                                   my='12px' fontSize={'1px'} color='transparent' h='90px'>
                                  </Box>
                                </Center>
                              )
                            }

                            {
                              index===step?
                              <Square mx='auto'  cursor={'pointer'} display={'flex'} bg='var(--primary-color)' justifyContent='center' 
                              borderRadius={'8px'}  size='35px' alignItems='center'>
                                <GiCheckMark fontSize={'22px'} color='white' />
                              </Square>
                              :
                              <Center cursor={'pointer'}>
                                <Circle p='0.4em' size='35px' background='#EFF0F7'>
                                  <Circle size='22px' p='0.3em' bg='white'>
                                    <Circle bg='var(--primary-color)' size='10px'></Circle>
                                  </Circle>
                                </Circle>
                              </Center>
                            }
                            {/* <Text color={step===index?'var(--primary-color)':'#D7D8DA'} fontSize={'14px'}> {entry} </Text> */}

                          </Box>
                        </Tab>
                      )
                    
                    }
                    
                    )
                  }
                </Box>
              </Center>
            </TabList>

            <TabPanels minH=' calc(97vh - 8rem)' px={step===3?0:'1.2em'} position={'relative'} 
            py={step===3?0 :'1.5em'} borderLeft={`1px solid #EFF0F7`} left={'15%'} maxW={{lg:'85%'}} >
              <TabPanel>
                <FormUserDetails
                  nextStep={nextStep}
                  onChange={onChange}
                  formData={formData}
                  profile={profile}
                  loading={loading}
                  openConnections={openConnections}
                />

              </TabPanel>
            
              <TabPanel>
                <FormWorkDetails
                  prevStep={prevStep}
                  nextStep={nextStep}
                  onChange={onChange}
                  formData={formData}
                  profile={profile}
                  loading={loading}
                  openConnections={openConnections}
                  
                />
              </TabPanel>
            
              <TabPanel>
                <FormSocialDetails
                 prevStep={prevStep}
                 nextStep={nextStep}
                 onChange={onChange}
                 formData={formData}
                 windowRef={windowRef}
                 profile={profile}
                 loading={loading}
                 connections={{
                  githubConnect,
                  linkedinConnect
                 }}
                 openConnections={openConnections}

                />
              </TabPanel>

              {/* <TabPanel p={0} py={'1em'} h='full'>
                <Payment 
                prevStep={prevStep}
                nextStep={nextStep}
                onChange={onChange}
                setValue={setValue}
                formData={formData}
                profile={profile}
                loading={loading}            
                />
              </TabPanel> */}
            
            </TabPanels>

          </Tabs>:

          <Confirm onChange={onChange} prevStep={prevStep} nextStep={nextStep} formData={formData} />

        }
      </NavLayout>
    </GoogleOAuthProvider>
  )

  if (step === 1) {
    return (
      <FormUserDetails
        nextStep={nextStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
      />
    );
  } 
  
  else if (step === 2) {
    return (
      <FormWorkDetails
        prevStep={prevStep}
        nextStep={nextStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
      />
    );
  } 

  else if (step === 3) {
    return (
      <FormSocialDetails
        prevStep={prevStep}
        nextStep={nextStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
      />
    );
  } 

  else if (step === 4) {
    return (
      <Confirm prevStep={prevStep} nextStep={nextStep} formData={formData} />
    );
  }
};


export const OnboardingContainer = styled.div`
  .below{
    margin-top:1em;
  }

`



export const FormRow = ({children,...rest})=>{


  return(
    <Flex direction={{ base: "column", lg: "row" }} gap={"2em"} {...rest}>
      {children}
    </Flex>

  )

}
export default UserForm;