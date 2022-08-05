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
import useAuthActions from '../../hooks/useAuth';
import { useToast } from '@chakra-ui/react';

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

const Confirm = ({ prevStep, formData }) => {

  const {updateUser,setProfile} = useAuthActions();

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
    try{      
      setLoading(true)
      let req = await updateUser({...trimmedFormData(formData)});
      
      if (req.data){
        let statusText = req.status==='201'?'created':'updated'
        toast({
          title:'Success',
          description:`User ${statusText} successfully`,
          status:'success',
          position:'top',
        })
        setProfile(req.data);
        history.push(statusText==='created'?'/':'/profile');
      }
    }
    catch(err){
      if (err.error){
        let error =err.error?.response

        console.log('error at create/update profile',error);
      }
    }
    finally{
      setLoading(false);
    }

  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

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
