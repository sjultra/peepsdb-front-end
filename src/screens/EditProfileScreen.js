import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import UserForm from '../components/form/UserForm';
import Spinner from '../components/layouts/Spinner';
import { getCurrentProfile } from '../actions/profileActions';

const EditProfileScreen = () => {
  const dispatch = useDispatch();

  // Selectors
  const profileState = useSelector((state) => state.profile);

  const { loading, profile } = profileState;

  useEffect(() => {
    if (!profile) {
      dispatch(getCurrentProfile());
    }
  }, [dispatch, profile]);

  if (!loading && profile) {
    return <UserForm profile={profile} loading={loading} />;
  } else if (!loading && !profile) {
    return <Redirect to='/profile' />;
  } else {
    return <Spinner />;
  }
};

export default EditProfileScreen;
