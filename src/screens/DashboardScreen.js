import React, {  useEffect, useRef } from 'react';
import Spinner from '../components/layouts/Spinner';
import GuestsDashboard from '../components/dashboard/GuestsDashboard';
import MembersDashboard from '../components/dashboard/MembersDashboard';
import useAuthActions from '../hooks/useAuth';
import useWidget from '../hooks/useWidget'

const DashboardScreen = () => {
  // Selectors
  const {auth,fetchMyProfile} = useAuthActions();

  const {loading} = useWidget()

  const fetchProfile = useRef(fetchMyProfile)

  useEffect(()=>{
    fetchProfile.current()
  },[])


  console.log('auth dashboad',auth)

  if(loading){
    return <Spinner />;
  }
  else if (auth?.token && auth?.role === 'Guest') {
    return <GuestsDashboard />;
  } 
  else if (auth?.token && auth.role !== 'Guest') {
    return <MembersDashboard />;
  } 
  else{
    return <>Nothing</>
  }
};

export default DashboardScreen;
