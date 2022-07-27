import React, { useContext } from 'react';
import Spinner from '../components/layouts/Spinner';
import GuestsDashboard from '../components/dashboard/GuestsDashboard';
import MembersDashboard from '../components/dashboard/MembersDashboard';
import { AppContext } from '../contextStore';

const DashboardScreen = () => {
  // Selectors
  const [{auth,loading}] = useContext(AppContext);

  // const userInfo = useSelector((state) => state.userInfo);
  console.log('auth at dashboard Screen',auth)

  if(loading){
    return <Spinner />;
  }
  else if (auth?.token && auth?.role === 'Guest') {
    return <GuestsDashboard />;
  } 
  else if (auth?.token && !auth.role === 'Guest') {
    return <MembersDashboard />;
  } 
  else{
    return <></>
  }
};

export default DashboardScreen;
