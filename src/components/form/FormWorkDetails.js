import React from 'react';
import {
  Wrapper,
  PrimaryHeading,
  FormControl,
  BtnWrapper,
  BtnPrev,
  BtnNext,
} from './FormResources';

const FormWorkDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
}) => {
  const {
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
  } = formData;

  const proceed = (e) => {
    e.preventDefault();
    nextStep();
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Wrapper>
      <PrimaryHeading className='text-center text-primary'>
        {loading || !profile  ? 'Registration' : 'Edit Profile'}
      </PrimaryHeading>
      <FormControl>
        <label htmlFor='timeZoneUrl'>Time Zone Url</label>
        <input
          type='text'
          name='timeZoneUrl'
          value={timeZoneUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='daysPerWeek'>Days Per Week</label>
        <input
          type='text'
          name='daysPerWeek'
          value={daysPerWeek}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='hoursPerDay'>Hours Per Day</label>
        <input
          type='text'
          name='hoursPerDay'
          value={hoursPerDay}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='localCurrencyUrl'>Local Currency Url</label>
        <input
          type='text'
          name='localCurrencyUrl'
          value={localCurrencyUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='femSlackProfileUrl'>Fem Slack Profile Url</label>
        <input
          type='text'
          name='femSlackProfileUrl'
          value={femSlackProfileUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='startDate'>Start Date</label>
        <input
          type='text'
          name='startDate'
          value={startDate}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='paymentProfileUrl'>Payment Profile Url</label>
        <input
          type='text'
          name='paymentProfileUrl'
          value={paymentProfileUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <BtnWrapper>
        <BtnPrev onClick={(e) => previous(e)}>Back</BtnPrev>
        <BtnNext onClick={(e) => proceed(e)}>Next</BtnNext>
      </BtnWrapper>
    </Wrapper>
  );
};

export default FormWorkDetails;
