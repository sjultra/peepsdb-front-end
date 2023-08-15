import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/layouts/Spinner';
import { getCurrentProfile } from '../actions/profileActions';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileError from '../components/profile/ProfileError';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  // Selectors
  const profileState = useSelector((state) => state.profile);

  const { loading, profile, error } = profileState;

  useEffect(() => {
    if (!profile) {
      dispatch(getCurrentProfile());
    }
  }, [dispatch, profile]);

  return (
    <>
      {loading && <Spinner />}
      {(!profile || error) && <ProfileError error={error} />}
      {!loading && profile && <ProfileInfo profile={profile} />}
    </>
  );
};

export default ProfileScreen;
