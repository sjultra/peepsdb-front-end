import React,{useState} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  DetailsWrapper,
  PrimaryHeading,
  BtnWrapper,
  BtnPrev,
  BtnNext,
} from './FormResources';
import useAuthActions from '../../../hooks/useAuth';
import { Box, Divider, Flex, useToast } from '@chakra-ui/react';
import { convertCamelCase } from '../../../utils/helpers';
import FormUserDetails from './FormUserDetails';
import FormWorkDetails from './FormWorkDetails';
import FormSocialDetails from './FormSocialDetails';
// import Payment from './Payment';
import Btn from '../../../widgets/Button';
import useGoBack from '../../../hooks/useGoBack';

const Details = styled.div`
  @media (max-width: 800px) {
    overflow-x: auto;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  align-items: center;

  @media (max-width: 800px) {
    width: 76rem;
  }

  div {
    height: 7rem;
    padding: 1rem 2rem;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
  }

  div:first-child {
    background: rgba(100, 90, 240, 0.173);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  div:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: rgba(160, 154, 238, 0.173);
  }
`;

const Confirm = ({ prevStep, formData,onChange,profile }) => {

  const {updateUser,setProfile,setAuth,auth} = useAuthActions();

  const history = useHistory();
  
  const toast = useToast();

  const [loading,setLoading] = useState(false)

  const trimmedFormData =()=>{
    let obj = {}


    for (const key in formData) {
      let value = formData[key];
      
      if (typeof(value)==='string' && value) {
        obj[key] =value.trim();
      }
      else{
        obj[key] =value;
      }
    }

    return obj;
  } 

  const {
    firstName,
    lastName,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
  } = trimmedFormData(formData);

  const proceed = async(e) => {
    e.preventDefault();
    // Send data to API
    let errorPayload  = [];
    try{      

      setLoading(true)
      const trimmedForm  =trimmedFormData(formData);
      const payload = {
        ...trimmedForm,
        _id:auth?._id
      }
      console.log('trimmedForm',payload?.avatar)

      let req = await updateUser(trimmedFormData(payload));
      
      if (req.data){
        let statusText = req.status==='201'?'created':'updated';
                
        statusText==='created'&& setAuth({...auth,profileSetup:true});

        toast({
          title:'Success',
          description:`User ${statusText} successfully`,
          status:'success',
          position:'top',
        });

        setProfile( req.data?._doc? req.data?._doc:req.data);
        
        history.push(statusText==='created'?'/':'/profile');
      }
    }
    catch(err){

      console.log('error at create/update profile',err,err?.response);
      let error =err?.response?.data;
      // if(error?.errors){

      //   (
      //   error?.errors.map((entry,index)=> index < 3 ? errorPayload.push(
      //     `${convertCamelCase(entry['param'])}: ${entry['msg']}`): undefined  
      //   ) 
      //   );

      // } 
      if (error){
        Object.keys(error).map((entry,index)=> index < 3 ? errorPayload.push(
          `${convertCamelCase(entry)}: ${error[entry]}`): undefined  
        ) 
    }

    }
    finally{
      errorPayload.length &&  
      toast({
        title:'Request failed',
        description: errorPayload.join(', '),
        status:'error',
        position: 'top',
        duration:errorPayload.length>2?15000: errorPayload?.length>1?8000:5000,
        isClosable:true
      })

      setLoading(false);
    }

  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };


  return(
    <Box px={{lg:'5em'}}>

      {useGoBack({goBack:()=>prevStep()})}

      <Box mt='1.2em'>
        <FormUserDetails  
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        previewMode 
        />
      </Box>

      <Divider py='1em' />

      <FormWorkDetails
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        preview
      />

      <Divider py='1em' />

      <FormSocialDetails
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        preview
      />

      {/* <Divider py='1em' />

      <Payment
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        preview
      />
 */}
      <Flex mt='1.2em' gap={'1.5em'}>
        <Btn isLoading={loading} onClick={e=>proceed(e)} >Submit</Btn>
        <Btn onClick={e=>previous(e)} variant={'fade'}>Previous</Btn>

      </Flex>



    </Box>
  )

  return (
    <DetailsWrapper>
      <PrimaryHeading className='text-center '>
        <span className='text-primary'>Confirm</span> User Data
      </PrimaryHeading>
      <Details>
        <Items>
          <div>firstName</div>
          <div>{firstName ? firstName : ''}</div>
        </Items>
        <Items>
          <div>lastName</div>
          <div>{lastName ? lastName : ''}</div>
        </Items>
        <Items>
          <div>Alias</div>
          <div>{alias ? alias : ''}</div>
        </Items>
        <Items>
          <div>SkypeId</div>
          <div>{skypeId ? skypeId : ''}</div>
        </Items>
        <Items>
          <div>Google Gmail Id</div>
          <div>{googleGmailId ? googleGmailId : ''}</div>
        </Items>
        <Items>
          <div>Apple Email Id</div>
          <div>{appleEmailId ? appleEmailId : ''}</div>
        </Items>
        <Items>
          <div>Phone</div>
          <div>{phone ? phone : ''}</div>
        </Items>
        <Items>
          <div>Time Zone Url</div>
          <div>{timeZoneUrl ? timeZoneUrl : ''}</div>
        </Items>
        <Items>
          <div>Days Per Week</div>
          <div>{daysPerWeek ? daysPerWeek : ''}</div>
        </Items>
        <Items>
          <div>Hours Per Day</div>
          <div>{hoursPerDay ? hoursPerDay : ''}</div>
        </Items>
        <Items>
          <div>Local Currency Url</div>
          <div>{localCurrencyUrl ? localCurrencyUrl : ''}</div>
        </Items>
        <Items>
          <div>FEM Slack Profile Url</div>
          <div>{femSlackProfileUrl ? femSlackProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Start Date</div>
          <div>{startDate ? startDate : ''}</div>
        </Items>
        <Items>
          <div>Payment Profile Url</div>
          <div>{paymentProfileUrl ? paymentProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Twitter Profile Url</div>
          <div>{twitterProfileUrl ? twitterProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Facebook Profile Url</div>
          <div>{facebookProfileUrl ? facebookProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Github Profile Url</div>
          <div>{githubProfileUrl ? githubProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Linkedin Profile Url</div>
          <div>{linkedinProfileUrl ? linkedinProfileUrl : ''}</div>
        </Items>
        <Items>
          <div>Calendly Profile Url</div>
          <div>{calendlyProfileUrl ? calendlyProfileUrl : ''}</div>
        </Items>
      </Details>
      <BtnWrapper>
        <BtnPrev disabled={loading} onClick={(e) => previous(e)}>Back</BtnPrev>
        <BtnNext disabled={loading} onClick={(e) => proceed(e)}>Submit</BtnNext>
      </BtnWrapper>
    </DetailsWrapper>
  );
};

export default Confirm;
