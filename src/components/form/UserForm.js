import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import FormWorkDetails from './FormWorkDetails';
import FormSocialDetails from './FormSocialDetails';
import Confirm from './Confirm';

const UserForm = ({ profile, loading }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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
    setFormData({
      firstname:
        loading || !profile || !profile.firstname ? '' : profile.firstname,
      lastname:
        loading || !profile || !profile.lastname ? '' : profile.lastname,
      alias: loading || !profile || !profile.alias ? '' : profile.alias,
      skypeId: loading || !profile || !profile.skypeId ? '' : profile.skypeId,
      googleGmailId:
        loading || !profile || !profile.googleGmailId
          ? ''
          : profile.googleGmailId,
      appleEmailId:
        loading || !profile || !profile.appleEmailId
          ? ''
          : profile.appleEmailId,
      phone: loading || !profile || !profile.phone ? '' : profile.phone,
      timeZoneUrl:
        loading || !profile || !profile.timeZoneUrl ? '' : profile.timeZoneUrl,
      daysPerWeek:
        loading || !profile || !profile.daysPerWeek ? '' : profile.daysPerWeek,
      hoursPerDay:
        loading || !profile || !profile.hoursPerDay ? '' : profile.hoursPerDay,
      localCurrencyUrl:
        loading || !profile || !profile.localCurrencyUrl
          ? ''
          : profile.localCurrencyUrl,
      femSlackProfileUrl:
        loading || !profile || !profile.femSlackProfileUrl
          ? ''
          : profile.femSlackProfileUrl,
      startDate:
        loading || !profile || !profile.startDate ? '' : profile.startDate,
      paymentProfileUrl:
        loading || !profile || !profile.paymentProfileUrl
          ? ''
          : profile.paymentProfileUrl,
      twitterProfileUrl:
        loading || !profile || !profile.twitterProfileUrl
          ? ''
          : profile.twitterProfileUrl,
      facebookProfileUrl:
        loading || !profile || !profile.facebookProfileUrl
          ? ''
          : profile.facebookProfileUrl,
      githubProfileUrl:
        loading || !profile || !profile.githubProfileUrl
          ? ''
          : profile.githubProfileUrl,
      linkedinProfileUrl:
        loading || !profile || !profile.linkedinProfileUrl
          ? ''
          : profile.linkedinProfileUrl,
      calendlyProfileUrl:
        loading || !profile || !profile.calendlyProfileUrl
          ? ''
          : profile.calendlyProfileUrl,
    });

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
  } else if (step === 2) {
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
  } else if (step === 3) {
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
  } else if (step === 4) {
    return (
      <Confirm prevStep={prevStep} nextStep={nextStep} formData={formData} />
    );
  }
};

export default UserForm;
