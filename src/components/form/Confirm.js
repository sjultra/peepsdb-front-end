import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createProfile, updateProfile } from '../../actions/profileActions';
import { setAlert } from '../../actions/alertActions';
import {
  DetailsWrapper,
  PrimaryHeading,
  BtnWrapper,
  BtnPrev,
  BtnNext,
} from './FormResources';

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
  const dispatch = useDispatch();

  // Selectors
  const profile = useSelector((state) => state.profile.profile);

  const history = useHistory();

  const trimmedFormData = {
    firstname: formData.firstname.trim(),
    lastname: formData.lastname.trim(),
    alias: formData.alias.trim(),
    skypeId: formData.skypeId.trim(),
    googleGmailId: formData.googleGmailId.trim(),
    appleEmailId: formData.appleEmailId.trim(),
    phone: formData.phone,
    timeZoneUrl: formData.timeZoneUrl.trim(),
    daysPerWeek: formData.daysPerWeek.trim(),
    hoursPerDay: formData.hoursPerDay.trim(),
    localCurrencyUrl: formData.localCurrencyUrl.trim(),
    femSlackProfileUrl: formData.femSlackProfileUrl.trim(),
    startDate: formData.startDate.trim(),
    paymentProfileUrl: formData.paymentProfileUrl.trim(),
    twitterProfileUrl: formData.twitterProfileUrl.trim(),
    facebookProfileUrl: formData.facebookProfileUrl.trim(),
    githubProfileUrl: formData.githubProfileUrl.trim(),
    linkedinProfileUrl: formData.linkedinProfileUrl.trim(),
    calendlyProfileUrl: formData.calendlyProfileUrl.trim(),
  };

  const {
    firstname,
    lastname,
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
  } = trimmedFormData;

  const proceed = (e) => {
    e.preventDefault();
    // Send data to API
    if (!profile) {
      dispatch(createProfile(trimmedFormData));
    } else {
      dispatch(updateProfile(trimmedFormData));
    }

    history.push('/');
    dispatch(
      setAlert(
        !profile ? 'Profile created' : 'Profile updated',
        'success',
        3000
      )
    );
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
          <div>Firstname</div>
          <div>{firstname ? firstname : ''}</div>
        </Items>
        <Items>
          <div>Lastname</div>
          <div>{lastname ? lastname : ''}</div>
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
        <BtnPrev onClick={(e) => previous(e)}>Back</BtnPrev>
        <BtnNext onClick={(e) => proceed(e)}>Submit</BtnNext>
      </BtnWrapper>
    </DetailsWrapper>
  );
};

export default Confirm;
