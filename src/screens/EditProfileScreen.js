import React from 'react';
import { Redirect } from 'react-router';
import UserForm from '../components/form/UserForm';
import Spinner from '../components/layouts/Spinner';
import useAuthActions from '../hooks/useAuth';
import useWidget from '../hooks/useWidget';

const EditProfileScreen = () => {

  // Selectors

  const { profile } = useAuthActions();

  const {loading} = useWidget()

  if (!loading && profile) {
    return <UserForm profile={profile} loading={loading} />;
  } else if (!loading && !profile) {
    return <Redirect to='/profile' />;
  } else {
    return <Spinner />;
  }
};

export default EditProfileScreen;
