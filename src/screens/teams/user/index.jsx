import UserScreen from './UserScreen';
import AdminAsideBar from '../../../components/layouts/AdminAsideBar';
import useAuthActions from '../../../hooks/useAuth';
import WorkerAsideBar from '../../../components/layouts/WorkerAsideBar';
import Spinner from '../../../components/layouts/Spinner';
import { Flex } from '@chakra-ui/react';

const User = () => {
  // Selectors
  const { auth, loading, profile } = useAuthActions();

  // spinner
  if (loading || !profile) {
    return (
      <Flex
        position={'fixed'}
        w="100vw"
        h="100vh"
        align={'center'}
        justify="center"
        top={0}
        left={0}
      >
        <Spinner />
      </Flex>
    );
  }

  // return details about a team member with custom admin aside bar
  if (auth?.token && auth?.role === 'Admin') {
    return (
      <AdminAsideBar>
        <UserScreen />
      </AdminAsideBar>
    );
  }

  // return details about a team member with custom worker aside bar
  return (
    <WorkerAsideBar>
      <UserScreen />
    </WorkerAsideBar>
  );
};

export default User;
