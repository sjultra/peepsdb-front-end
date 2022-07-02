import React from 'react';
import {
  Wrapper,
  PrimaryHeading,
  FormControl,
  BtnWrapper,
  BtnPrev,
  BtnNext,
} from './FormResources';

const FormSocialDetails = ({
  nextStep,
  prevStep,
  onChange,
  formData,
  loading,
  profile,
}) => {
  const {
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
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
        {loading || !profile ? 'Registration' : 'Edit Profile'}
      </PrimaryHeading>
      <FormControl>
        <label htmlFor='twitterProfileUrl'>Twitter Profile Url</label>
        <input
          type='text'
          name='twitterProfileUrl'
          value={twitterProfileUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='facebookProfileUrl'>Facebook Profile Url</label>
        <input
          type='text'
          name='facebookProfileUrl'
          value={facebookProfileUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='githubProfileUrl'>Github Profile Url</label>
        <input
          type='text'
          name='githubProfileUrl'
          value={githubProfileUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='timeZoneUrl'>Linkedin Profile Url</label>
        <input
          type='text'
          name='linkedinProfileUrl'
          value={linkedinProfileUrl}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='calendlyProfileUrl'>Calendly Profile Url</label>
        <input
          type='text'
          name='calendlyProfileUrl'
          value={calendlyProfileUrl}
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

export default FormSocialDetails;
