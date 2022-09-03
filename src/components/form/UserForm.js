import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import FormWorkDetails from './FormWorkDetails';
import FormSocialDetails from './FormSocialDetails';
import Confirm from './Confirm';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Circle, Center, Square } from '@chakra-ui/react'
import {  renderJSX } from '../../utils/helpers';
import {GiCheckMark} from 'react-icons/gi'

const UserForm = ({ profile, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    avatar:'',
    lastName: '',
    alias: '',
    skypeId: '',
    googleGmailId: '',
    appleEmailId: '',
    microsoftEmailId:'', 
    phone: '',
    timeZoneUrl: '',
    daysPerWeek: '',
    hoursPerDay: '',
    localCurrencyUrl: '',
    femSlackProfileUrl: '',
    startDate: '',
    paymentProfileUrl: '',
    twitterProfileUrl: '',
    facebookProfileUrl: '',
    githubProfileUrl: '',
    linkedinProfileUrl: '',
    calendlyProfileUrl: '',
    provider:profile?.provider
    
  });

  useEffect(() => {
    setFormData(profile);
  }, []);

  const [step, setStep] = useState(0);
  // company: loading || !profile.company ? '' : profile.company,

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
  });

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
      <Tabs as='form' index={step} onChange={(index)=>setStep(index)}  orientation='vertical'>

        <TabList py={4} justifyContent='flex-start' ml={{lg:'5rem'}} position={'fixed'}  top='8rem' left={0} borderLeft={'none'}>
          <Text fontSize={'15px'} fontWeight={500} mb={'1em'}>Onboarding guide</Text>
          <Center>
            <Box>

              {
                ['Personal','Work','Social','Payment'].map((entry,index)=>{

                  const activeLineColor = index===step?'var(--primary-color)':'#EFF0F7'
                  return(
                    <Tab key={index}  minW={'80px'} justifyContent={'center'} borderLeft={'none'}>
                      <Box  >
                        {
                          renderJSX(
                            index ,
                            <Center>                  
                              <Box borderRight={`2px solid ${activeLineColor}`} 
                              my='7px' fontSize={'1px'} color='transparent' h='45px'>

                              </Box>
                            </Center>
                          )
                        }

                        {
                          index===step?
                          <Square mx='auto' cursor={'pointer'} display={'flex'} bg='var(--primary-color)' justifyContent='center' 
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
                        <Text color={step===index?'var(--primary-color)':'#D7D8DA'} fontSize={'14px'}> {entry} </Text>

                      </Box>
                    </Tab>
                  )
                
                }
                
                )
              }
            </Box>
          </Center>
        </TabList>

        <TabPanels h=' calc(97vh - 8rem)' px='1.2em' position={'relative'} 
         py='1.5em' borderLeft={`1px solid #EFF0F7`} left={'15%'} maxW={{lg:'85%'}} >
          <TabPanel>
            <FormUserDetails
              nextStep={nextStep}
              onChange={onChange}
              formData={formData}
              profile={profile}
              loading={loading}
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
            />
          </TabPanel>
          <TabPanel>
          <FormSocialDetails
           prevStep={prevStep}
           nextStep={nextStep}
           onChange={onChange}
           formData={formData}
           profile={profile}
           loading={loading}
        />
          </TabPanel>
        </TabPanels>


      </Tabs>
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

export default UserForm;
