import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import FormWorkDetails from './FormWorkDetails';
import FormSocialDetails from './FormSocialDetails';
import Confirm from './Confirm';

const UserForm = ({ profile, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    alias: '',
    skypeId: '',
    googleGmailId: '',
    appleEmailId: '',
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
  });

  useEffect(() => {
    setFormData(profile);

    // eslint-disable-next-line
  }, []);

  const [step, setStep] = useState(1);
  // company: loading || !profile.company ? '' : profile.company,

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
  });

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };

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
