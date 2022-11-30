import React from 'react';
import NavLayout from '../components/layouts/NavLayout';
import Spinner from '../components/layouts/Spinner';
import ProfileInfo from '../components/profile/ProfileInfo';
import useAuthActions from '../hooks/useAuth';
import useWidget from '../hooks/useWidget';

const ProfileScreen = () => {

  // Selectors


  const { profile } = useAuthActions();

  const {loading} = useWidget()



  console.log('user profile at profilescreen',profile);

  if(loading) return <Spinner />
  return (
    <NavLayout>
      <ProfileInfo profile={profile} />
    </NavLayout>
  );
};

export default ProfileScreen;
