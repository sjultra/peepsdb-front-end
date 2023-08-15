import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthActions from '../../../hooks/useAuth';
import { Box, Divider, Flex, useToast } from '@chakra-ui/react';
import { convertCamelCase } from '../../../utils/helpers';
import FormUserDetails from './FormUserDetails';
import FormWorkDetails from './FormWorkDetails';
import FormSocialDetails from './FormSocialDetails';
// import Payment from './Payment';
import Btn from '../../../widgets/Button';
import useGoBack from '../../../hooks/useGoBack';
import { newTimezonesCity } from '../../../utils/timezone-list';

const Confirm = ({ prevStep, formData, onChange, profile }) => {
  const { updateUser, setProfile, setAuth, auth } = useAuthActions();

  const history = useHistory();

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const trimmedFormData = () => {
    let obj = {};

    for (const key in formData) {
      let value = formData[key];

      if (typeof value === 'string' && value) {
        obj[key] = value.trim();
      } else {
        obj[key] = value;
      }
    }

    return obj;
  };

  const trimmedForm = trimmedFormData(formData);

  const {
    firstName,
    lastName,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    timezone,
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
  } = trimmedForm;

  const proceed = async (e) => {
    e.preventDefault();
    // Send data to API
    let errorPayload = [];
    try {
      let city = timezone?.split('/')[1];
      let country = newTimezonesCity()[city];
      let timeZoneUrl = `https://www.timeanddate.com/worldclock/${country}/${city}`;
      setLoading(true);
      console.log('country and city', timeZoneUrl);
      const payload = {
        ...trimmedForm,
        _id: auth?._id,
        country,
        timeZoneUrl,
      };
      console.log('trimmedForm', payload?.avatar);

      let req = await updateUser(trimmedFormData(payload));

      if (req.data) {
        let statusText = req.status === '201' ? 'created' : 'updated';

        statusText === 'created' && setAuth({ ...auth, profileSetup: true });

        toast({
          title: 'Success',
          description: `User ${statusText} successfully`,
          status: 'success',
          position: 'top',
        });

        setProfile(req.data?._doc ? req.data?._doc : req.data);

        history.push(statusText === 'created' ? '/' : '/profile');
      }
    } catch (err) {
      console.log('error at create/update profile', err, err?.response);
      let error = err?.response?.data;
      // Under review
      // if(error?.errors){
      //   (
      //   error?.errors.map((entry,index)=> index < 3 ? errorPayload.push(
      //     `${convertCamelCase(entry['param'])}: ${entry['msg']}`): undefined
      //   )
      //   );

      // }
      if (error) {
        Object.keys(error).map((entry, index) =>
          index < 3
            ? errorPayload.push(`${convertCamelCase(entry)}: ${error[entry]}`)
            : undefined
        );
      }
    } finally {
      errorPayload.length &&
        toast({
          title: 'Request failed',
          description: errorPayload.join(', '),
          status: 'error',
          position: 'top',
          duration:
            errorPayload.length > 2
              ? 15000
              : errorPayload?.length > 1
              ? 8000
              : 5000,
          isClosable: true,
        });

      setLoading(false);
    }
  };

  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Box px={{ lg: '0em' }} pb="20">
      {useGoBack({ goBack: () => prevStep() })}

      <Box mt="1.2em">
        <FormUserDetails
          prevStep={prevStep}
          onChange={onChange}
          formData={formData}
          profile={profile}
          loading={loading}
          previewMode
        />
      </Box>

      <Divider py="1em" />

      <FormWorkDetails
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        preview
      />

      <Divider py="1em" />

      <FormSocialDetails
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        preview
      />

      {/* Under Review
      
      <Divider py='1em' />

      <Payment
        prevStep={prevStep}
        onChange={onChange}
        formData={formData}
        profile={profile}
        loading={loading}
        preview
      />
 */}
      <Flex mt="1.2em" gap={'1.5em'}>
        <Btn isLoading={loading} onClick={(e) => proceed(e)}>
          Submit
        </Btn>
        <Btn onClick={(e) => previous(e)} variant={'fade'}>
          Previous
        </Btn>
      </Flex>
    </Box>
  );
};

export default Confirm;
