import React from 'react';
import { useSelector } from 'react-redux';
import UserForm from '../form/UserForm';
import Registered from '../registered/Registered';
import Spinner from '../layouts/Spinner';

const GuestsDashboard = () => {

  // Selectors
  const profileState = useSelector((state) => state.profile);

  const { loading, profile } = profileState;

  // useEffect(() => {
  //   if (!profile) {
  //     dispatch(getCurrentProfile());
  //   }
  // }, [dispatch, profile]);

  if (!loading && profile) {
    return <Registered />;
  } else if (!loading && !profile) {
    return <UserForm profile={profile} loading={loading} />;
  } else {
    return <Spinner />;
  }
};

export default GuestsDashboard;
