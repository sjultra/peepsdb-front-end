import {  useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import MeetingScheduleContent from '../components/meeting/MeetingScheduleContent';
import Spinner from '../components/layouts/Spinner';
import Message from '../components/layouts/Message';
import {
  PrimaryHeading,
  ContentWrapper
} from './ScreenResources';
import useTeams from '../hooks/useTeams';
import useWidget from '../hooks/useWidget';
import useAuthActions from '../hooks/useAuth';
import { Redirect } from 'react-router-dom';
import NavLayout from '../components/layouts/NavLayout';
import { Box, Flex, HStack } from '@chakra-ui/react';

const TableHead = styled.div`
  background: #fcfcfc;
  height: 6rem;
  width: 100%;
  display: grid;
  grid-template-columns: 0.22fr 0.4fr 0.38fr;
  grid-column-gap: 3rem;
  align-items: center;
  border-radius: 0.4rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding: 1.7rem 1rem 1.7rem 3rem;
  min-width: 120rem;
  font-weight: 500;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const MeetingScheduleScreen = () => {

  const {profiles,fetchAllProfiles,} = useTeams();

  const {profile:auth} = useAuthActions()

  const {loading} = useWidget()

  useEffect(()=>{
    !profiles.length && fetchAllProfiles()
  },[fetchAllProfiles])

  const error = false;

  const [filterText, setFilterText] = useState('');

  if(auth?.token && !auth?.profileSetup){
    return <Redirect to='/' />
  }

  return (
    <Box px={["0", "16"]} pb="100px">
      <NavLayout displayAsidebar={false}>
        <Box>
          <Flex
            direction={["column", "row"]}
            align={["start", "center"]}
            justify="space-between">
            <PrimaryHeading className="text-primary">
              Schedule Meeting
            </PrimaryHeading>

            {!error && (
              
                <HStack
                  w={{ base: "full", md: "auto", lg: "auto" }}
                  bg="#fcfcfc"
                  borderRadius="full"
                  border="1px solid #f7f7f7"
                  px="1.8rem"
                  py="0.5rem"
                  h="fit-content">
                  <BiSearch />
                  <input
                    type="text"
                    style={{
                      outline: "0",
                      color: "#333",
                      padding: "0.6rem",
                      backgroundColor: "transparent",
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
              overflow={"auto"}
              w={["calc(100vw - 6rem)", "calc(100vw - 8rem)"]}>
              <ContentWrapper>
                <TableHead>
                  <div>Team Members</div>
                  <div>Local Times</div>
                  <div>Calendly Link</div>
                </TableHead>
                {/** Loading state */}
                {loading && <Spinner />}
                <MeetingScheduleContent
                  profiles={profiles}
                  filterText={filterText}
                />
              </ContentWrapper>
            </Box>
          )}
        </Box>
      </NavLayout>
    </Box>
  );
};

export default MeetingScheduleScreen;
