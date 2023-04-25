import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Box, Flex, HStack, Grid, GridItem } from '@chakra-ui/react';
import NavLayout from '../components/layouts/NavLayout';
import { BiSearch } from 'react-icons/bi';

import MeetingScheduleContent from '../components/meeting/MeetingScheduleContent';
import Spinner from '../components/layouts/Spinner';
import Message from '../components/layouts/Message';
import useTeams from '../hooks/useTeams';
import useWidget from '../hooks/useWidget';
import useAuthActions from '../hooks/useAuth';

const MeetingScheduleScreen = () => {
  const { profiles, fetchAllProfiles } = useTeams();

  const { profile: auth } = useAuthActions();

  const { loading } = useWidget();

  useEffect(() => {
    !profiles.length && fetchAllProfiles();
  }, [fetchAllProfiles]);

  const error = false;

  const [filterText, setFilterText] = useState('');

  if (auth?.token && !auth?.profileSetup) {
    return <Redirect to="/" />;
  }

  return (
    <Box px={['0', '16']} pb="100px">
      <NavLayout displayAsidebar={false}>
        <Box>
          <Flex
            direction={['column', 'row']}
            align={['start', 'center']}
            justify="space-between"
          >
            <Box color="var(--primary-color)">Schedule Meeting</Box>

            {!error && (
              <HStack
                w={{ base: 'full', md: 'auto', lg: 'auto' }}
                bg="#fcfcfc"
                borderRadius="full"
                border="1px solid #f7f7f7"
                px="1.8rem"
                py="0.5rem"
                h="fit-content"
              >
                <BiSearch />
                <input
                  type="text"
                  style={{
                    outline: '0',
                    color: '#333',
                    padding: '0.6rem',
                    backgroundColor: 'transparent',
                  }}
                  placeholder="Search..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </HStack>
            )}
          </Flex>
          {/** catch and display error */}
          {error && error.msg && <Message msg={error.msg} variant="error" />}

          {profiles && (
            <Box
              overflow={'auto'}
              w={['calc(100vw - 6rem)', 'calc(100vw - 8rem)']}
            >
              <Box overflowX="auto" className="dontShowScrollBar">
                <Grid
                  bg="#fcfcfc"
                  h="6rem"
                  w="100%"
                  gridTemplateColumns="0.22fr 0.4fr 0.38fr"
                  gridColumnGap="3rem"
                  alignItems="center"
                  borderRadius="0.4rem"
                  mt="3rem"
                  mb="1rem"
                  p={{ base: '1.7rem 1rem', md: '1.7rem 1rem 1.7rem 3rem' }}
                  minWidth="120rem"
                  fontWeight="500"
                >
                  <GridItem>Team Members</GridItem>
                  <GridItem>Local Times</GridItem>
                  <GridItem>Calendly Link</GridItem>
                </Grid>
                {/** Loading state */}
                {loading && <Spinner />}
                <MeetingScheduleContent
                  profiles={profiles}
                  filterText={filterText}
                />
              </Box>
            </Box>
          )}
        </Box>
      </NavLayout>
    </Box>
  );
};

export default MeetingScheduleScreen;
