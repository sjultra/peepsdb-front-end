import React from 'react';
import { Redirect } from 'react-router';
import UserForm from '../components/form/Onboarding/UserForm';
import Spinner from '../components/layouts/Spinner';
import useAuthActions from '../hooks/useAuth';
import useWidget from '../hooks/useWidget';

const EditProfileScreen = () => {

  const { profile } = useAuthActions();

  const {loading} = useWidget()

  console.log('user profile', profile);

  if (!loading && profile) {
    return <UserForm profile={profile} loading={loading} />;
  } else if (!loading && !profile) {
    //return <Redirect to='/profile' />;
  } else {
    return <Spinner />;
  }
};

export default EditProfileScreen;
