import React, {  useEffect, useRef } from 'react';
import Spinner from '../components/layouts/Spinner';
import GuestsDashboard from '../components/dashboard/GuestsDashboard';
import MembersDashboard from '../components/dashboard/MembersDashboard';
import useAuthActions from '../hooks/useAuth';

const DashboardScreen = () => {
  // Selectors
  const {auth,fetchMyProfile,loading} = useAuthActions();


  const fetchProfile = useRef(fetchMyProfile)



  // useEffect(()=>{
  //   auth?.token && fetchProfile.current(auth?.token);
  // },[auth])



  if(loading){
    return <Spinner />;
  }
  if (auth?.token && auth?.role === 'Guest') {
    return <GuestsDashboard />;
  } 
  if (auth?.token && auth.role !== 'Guest') {
    return <MembersDashboard />;
  } 

  return <>Nothing</>
};

export default DashboardScreen;
