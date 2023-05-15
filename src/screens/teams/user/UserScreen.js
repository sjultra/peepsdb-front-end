import { useEffect, useMemo, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Spinner from '../../../components/layouts/Spinner';

import useTeams from '../../../hooks/useTeams';
import useAuth from '../../../hooks/useAuth';
import useWidget from '../../../hooks/useWidget';
import useGoBack from '../../../hooks/useGoBack';
import UserProfile from '../../../components/UserProfile';

const UserScreen = () => {
  const { profile } = useAuth();

  const { fetchUserProfile } = useTeams();

  const [user, setUser] = useState(undefined);

  const { loading, openModal } = useWidget();

  const fetchUserRef = useRef(fetchUserProfile);

  // const id = match?.params?.id;

  const goback = useGoBack({});

  const { id } = useParams();

  useMemo(() => console.log('user is suspended', user), [user?.isSuspended]);

  useEffect(() => {
    (async () => {
      let fetchUser = await fetchUserRef.current(id);

      if (fetchUser?.data) {
        setUser(fetchUser?.data);
      } else {
        console.error(fetchUser.error);
      }
    })();
  }, [id]);

  if (!id && profile?.role !== 'Admin') {
    console.log('redirect back to home at userscren');
    return <Redirect to="/" />;
  }
  return (
    <>
      {goback}

      {loading && <Spinner />}

      {user && <UserProfile user={user} setUser={setUser} />}
    </>
  );
};

export default UserScreen;
