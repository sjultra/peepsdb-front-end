import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/layouts/Spinner';
import GuestsDashboard from '../components/dashboard/GuestsDashboard';
import MembersDashboard from '../components/dashboard/MembersDashboard';

const DashboardScreen = () => {
  // Selectors
  const userInfo = useSelector((state) => state.userInfo);

  const { loading, user } = userInfo;

  if (!loading && user && user.role === 'Guest') {
    return <GuestsDashboard />;
  } else if (!loading && user && user.role !== 'Guest') {
    return <MembersDashboard />;
  } else {
    return <Spinner />;
  }
};

export default DashboardScreen;
