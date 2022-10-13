import {  Flex } from "@chakra-ui/react";
import React from "react";
import useValidate from "../../../hooks/useValidate";
import useWidget from "../../../hooks/useWidget";
import { renderJSX } from "../../../utils/helpers";
import Btn from "../../../widgets/Button";
import Input from "../../../widgets/Input";
import TextInput from "../../../widgets/Text";
import { OnboardingContainer } from "./UserForm";
import {LoginSocialGoogle} from 'reactjs-social-login'
import { backendURL } from "../../../utils/setEnv";


const FormWorkDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
  preview
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

  const {openModal} = useWidget()

  const proceed = (e) => {
    e.preventDefault();

    const payload = {
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
    }

    
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
      {
      renderJSX(
        preview,
        <Flex my='0.8em' align={'center'} justify={'space-between'}>
          <TextInput variant={'s2'}>Work info</TextInput>
          
          {/* <Btn  px='1.2em' h='40px' variant={'fade'} rightIcon={<AiFillEdit fontSize={'14px'} />} >Edit</Btn> */}

        </Flex>,
        <></>
      )
      }


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
         Sync={LoginSocialGoogle}
         syncProps={{
            client_id:process.env['REACT_APP_GOOGLE_CLIENT_ID'],
            scope:"openid profile email",
            discoveryDocs:"claims_supported",
            access_type:"offline",
            redirect_uri:backendURL+process.env['REACT_APP_GOOGLE_CALLBACK_URL'],
            onResolve:({ provider, data }) => {
              console.log('provider',provider);
              console.log('data',data)
            },
            onReject:err => {
              console.log(err)
            }
         }}
         isNotProvider={provider !=='google' }
        />

        <Input
          fontSize="15px"
          flex={1}
          label={"Apple Email ID"}
          required
          tooltipText='apple'
          name="appleEmaailId"
          value={googleGmailId}
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
          />


          <Input
            label='Days Per Week'
            type="number"
            name="daysPerWeek"
            value={daysPerWeek}
            onChange={(e) => onChange(e,'number')}
            flex={1}
            {...{preview}}
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
