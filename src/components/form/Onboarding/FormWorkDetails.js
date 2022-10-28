import {  Flex } from "@chakra-ui/react";
import React from "react";
import useValidate from "../../../hooks/useValidate";
import { renderJSX } from "../../../utils/helpers";
import Btn from "../../../widgets/Button";
import Input from "../../../widgets/Input";
import TextInput from "../../../widgets/Text";
import { OnboardingContainer } from "./UserForm";
import { backendURL } from "../../../utils/setEnv";
// import { useGoogleLogin } from '@react-oauth/google';
import useWidget from "../../../hooks/useWidget";

const FormWorkDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
  preview,
  openConnections
}) => {
  const {
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    googleGmailId,
    appleEmailId,
    skypeId,
    microsoftEmailId,
    title,
    provider
  } = formData;

  const val3idateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const {isRequired,validateConditions,error} = useValidate()

  
  console.log('google url',`${backendURL}/auth/inapp`)

  const googleLogin =  ()=>{}
  // useGoogleLogin({
  //   onSuccess: codeResponse => console.log('google login',codeResponse),
  //   flow: 'auth-code',
  //   redirect_uri:`${backendURL}/auth/inapp`
  // });

  const proceed = (e) => {
    e.preventDefault();

    // const payload = {
    //   timeZoneUrl,
    //   daysPerWeek,
    //   hoursPerDay,
    //   localCurrencyUrl,
    //   femSlackProfileUrl,
    //   startDate,
    //   paymentProfileUrl,
    //   googleGmailId,
    //   appleEmailId,
    //   skypeId,
    //   microsoftEmailId,
    // }

    
    let error = false;

    if (isRequired([daysPerWeek,hoursPerDay,startDate],true)) {
      error=true;
    }
    else if (validateConditions([daysPerWeek,hoursPerDay,val3idateEmail(googleGmailId)],['Days per week must be at least 1','Hours per day must be at least 1','Please enter a valid google mail'])){
      error = true;
    }
    else{

      console.log('payload at step2',formData);
      
      nextStep();

    }



  };

  const previous = (e) => {
    e.preventDefault();

    prevStep();
  };




  return (
    <OnboardingContainer>
            <Flex my='0.2em' align={'center'} justify={ preview?'space-between' :'flex-end'}>
              {
                renderJSX(
                  preview,
                  <TextInput variant={'s2'}>Work</TextInput>
                )
              }

              <Btn px='1em' onClick={openConnections}>
                My Connections
              </Btn>


            </Flex>


      <Flex direction={{ base: "column", lg: "row" }} gap={"2em"}>
        <Input
         fontSize="15px"
         flex={1}
         label={"Google gmail ID"}
         required
         name="googleGmailId"
         value={googleGmailId}
         onChange={onChange}
         {...{preview}}
         Sync={googleLogin}
         isNotProvider={provider !=='google' }
         tooltipText='google'
        />

        <Input
          fontSize="15px"
          flex={1}
          label={"Apple Email ID"}
          // required
          tooltipText='apple'
          name="appleEmailId"
          value={appleEmailId}
          onChange={onChange}
          {...{preview}}
          // syncFn={
          //   ()=>{
              
          //   }
          // }
        />
      </Flex>

      <Flex className="below" direction={{ base: "column", lg: "row" }} gap={"2em"}>

          <Input
           label='Title'
           type="text"
           name="title"
           value={title}
           onChange={(e) => onChange(e)}
           flex={1}
           {...{preview}}
          />


          <Input
            label='Timezone Url'
            type="text"
            name="timeZoneUrl"
            value={timeZoneUrl}
            onChange={(e) => onChange(e)}
            flex={1}
            {...{preview}}
          />

  

      </Flex>


      <Flex className="below"  direction={{ base: "column", lg: "row" }} gap={"2em"}>

          <Input
            label='Start Date'
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => onChange(e)}
            flex={1}
            required
          />


          <Input
            label='Days Per Week'
            type="number"
            name="daysPerWeek"
            value={daysPerWeek}
            onChange={(e) => onChange(e,'number')}
            flex={1}
            {...{preview}}
            required
          />
          
      </Flex>

      <Flex className="below"  direction={{ base: "column", lg: "row" }} gap={"2em"}>

          <Input
            label='Hours Per Day'
            type="number"
            name="hoursPerDay"
            value={hoursPerDay}
            onChange={(e) => onChange(e,'number')}
            flex={{base:1,lg:0.5}}
            {...{preview}}
            required
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

export default FormWorkDetails;
