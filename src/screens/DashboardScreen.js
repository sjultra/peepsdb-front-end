import React from 'react';

import { Box, Center, Circle, Flex, Image, Text } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { deviceDetect, isMobile } from 'react-device-detect';

import Spinner from '../components/layouts/Spinner';
import OnboardUser from '../components/form/Onboarding/UserForm';
import UserWorkspace from '../components/workspace';
import WorkerAsideBar from '../components/layouts/WorkerAsideBar';

import useAuthActions from '../hooks/useAuth';

import Btn from '../widgets/Button';
import AdminDashboard from './Admin';

const DashboardScreen = () => {
  // Selectors
  const { auth, loading, profile, logout, welcome, closeWelcome } =
    useAuthActions();

  const userloading = welcome;

  console.log('loading included value', auth, profile);

  if (loading || !profile) {
    return (
      <Flex
        position="fixed"
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Spinner />
      </Flex>
    );
  } else if (!auth?.profileSetup) return <OnboardUser profile={profile} />;
  // else if (userloading) {
  //   return (
  //     <OnboardingModal
  //       proceed={closeWelcome}
  //       logout={logout}
  //       profile={profile}
  //     />
  //   );
  // } 
  else if (auth?.token && auth?.role === 'Admin') {
    return <AdminDashboard />;
  } else {
    return (
      <WorkerAsideBar>
        <UserWorkspace />
      </WorkerAsideBar>
    );
  }
};

const OnboardingModal = ({ profile, logout, proceed }) => {
  const { email, alias, firstname, lastname } = profile || {};

  const device = deviceDetect();

  const clientType = isMobile ? 'Mobile' : 'Web';

  const userAlias = email || alias || `${firstname} ${lastname}`;

  return (
    <Box p={{ base: '1.2em', md: '1.5em', lg: '2em 3em' }}>
      <Flex justify={'flex-end'}>
        <Circle
          cursor={'pointer'}
          onClick={proceed}
          p="0.2em"
          size="40px"
          background="rgba(1, 86, 218, 0.31)"
          color="primary.500"
        >
          <IoClose fontSize="30px" color="primary.500" />
        </Circle>
      </Flex>
      <Center mt="0.5em">
        <Box>
          <Center>
            <Text as="h6" fontSize="24px">
              Welcome
            </Text>
          </Center>

          <Center>
            <Text as="h6" color="primary.500" fontSize="26px">
              {userAlias}
            </Text>
          </Center>

          <Center>
            <Image
              src="/Assets/welcome.svg"
              h={{ base: '200px', lg: '250px' }}
            />
          </Center>

          <Center>
            <Flex>
              <Flex gap="0.2em" mt="0.4em">
                <Text fontSize="18px">Client Info:</Text>

                <Text fontSize="18px" fontWeight={500} color="primary.500">
                  {device?.browserName} {clientType} {device?.engineVersion}
                </Text>
              </Flex>
            </Flex>
          </Center>

          <Btn mt="1.2em" onClick={proceed} w="full" full fontSize="16px">
            Proceed
          </Btn>

          <Btn
            mt="1.3em"
            onClick={logout}
            w="full"
            display="flex"
            gap="0.4em"
            variant="fade"
            full
          >
            <BiLogOut color="initial" />
            <Text fontSize="18px" color="initial" fontWeight={500}>
              Logout
            </Text>
          </Btn>
        </Box>
      </Center>
    </Box>
  );
};

export default DashboardScreen;
