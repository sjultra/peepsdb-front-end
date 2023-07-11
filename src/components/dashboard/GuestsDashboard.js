import React from 'react';
// import { useSelector } from 'react-redux';
import UserForm from '../form/Onboarding/UserForm';
import Registered from '../registered/Registered';
import Spinner from '../layouts/Spinner';
import useAuthActions from '../../hooks/useAuth';
import useWidget from '../../hooks/useWidget';

const GuestsDashboard = () => {

  // Selectors
  const {profile} = useAuthActions();

  const {loading} = useWidget()

  // useEffect(() => {
  //   if (!profile) {
  //     dispatch(getCurrentProfile());
  //   }
  // }, [dispatch, profile]);

  console.log('profile at guest dashboard',profile)


  if (!loading){
    if (profile?.isOnboarded) {
      return <Registered />;
    } 
    else {
      return <UserForm profile={profile} loading={loading} />;
    }
  }
  
  else {
    return <Spinner />;
  }
};

export default GuestsDashboard;
