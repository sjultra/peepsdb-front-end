import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserForm from '../form/UserForm';
import Registered from '../registered/Registered';
import Spinner from '../layouts/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';

const GuestsDashboard = () => {
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
    return <Registered />;
  } else if (!loading && !profile) {
    return <UserForm profile={profile} loading={loading} />;
  } else {
    return <Spinner />;
  }
};

export default GuestsDashboard;
