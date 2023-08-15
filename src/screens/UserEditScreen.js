import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery, Box, Flex, FormLabel, Select } from '@chakra-ui/react';

import { updateUserOnboardStatus } from '../actions/onboardActions';
import Spinner from '../components/layouts/Spinner';
import useWidget from '../hooks/useWidget';
import { capitalizeString } from '../utils/helpers';

const UserEditScreen = ({ payload }) => {
  // Media Query Stylings
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const [isLargerThan550] = useMediaQuery('(min-width: 550px)');
  const [isLargerThan375] = useMediaQuery('(min-width: 375px)');

  // Stylings
  const labelStylings = {
    m: '2rem 0 1rem 0',
    color: 'rgba(4, 9, 33, 0.76)',
    fontSize: '15px',
  };

  const selectStylings = {
    h: '50px',
    p: '0 2rem',
    border: '2px solid #f1f1f1',
    bg: 'rgba(4, 9, 33, 0.04)',
    border: '1.36937px solid rgba(4, 9, 33, 0.04)',
    borderRadius: '12px',

    sx: {
      '&:focus': {
        outline: '0',
        border: '2px solid #5e55ef',
      },
    },
  };

  const dispatch = useDispatch();
  //hooks

  const { loading } = useWidget();

  const {
    profile: user,
    // onboard
  } = payload;

  const { firstName, lastName } = user;

  // State

  // const [userData,setUserData] = useState({
  //   role: user?.role || '' ,
  // })

  const [role, setRole] = useState(user && user.role);
  const [ndaSent, setndaSent] = useState(user && user.ndaSent);
  const [ndaSigned, setndaSigned] = useState(user && user.ndaSigned);
  const [emailSetup, setEmailSetup] = useState(user && user.emailSetup);
  const [sendReceiveEmail, setSendReceiveEmail] = useState(
    user && user.sendReceiveEmail
  );
  const [msTeamsSetup, setMsTeamsSetup] = useState(user && user.msTeamsSetup);

  2 + 2 === 5 && console.log(setMsTeamsSetup);

  const onSubmitHandler = () => {
    // dispatch to onboard route to update
    const formData = {
      // user: match.params.id,
      role,
      ndaSent,
      ndaSigned,
      emailSetup,
      sendReceiveEmail,
      msTeamsSetup,
    };

    dispatch(updateUserOnboardStatus(formData));
    // history.push(`/admin/users/${match.params.id}`);
  };

  const flexDirection = {
    direction: { base: 'column', lg: 'row' },
  };

  const flexGap = {
    gap: '1.5em',
  };

  return (
    <Box className="editUser" pb="2rem">
      <Box m="2rem 0" className="text-center text-primary">
        Edit User
      </Box>

      {loading && <Spinner />}

      {user && (
        <Box>
          <Box margin="2rem 0 1rem 0">Name</Box>
          <Flex height="50px" alignItems="center">
            {capitalizeString(firstName)} {capitalizeString(lastName)}
          </Flex>
        </Box>
      )}

      {user && (
        <form onSubmit={onSubmitHandler}>
          <Flex {...flexDirection} {...flexGap}>
            <Box flex={1}>
              <Flex flexDirection="column">
                <FormLabel {...labelStylings} htmlFor="role">
                  Role
                </FormLabel>
                <Select
                  {...selectStylings}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Guest">Guest</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin"> Admin</option>
                </Select>
              </Flex>
            </Box>

            <Box flex={1}>
              <Flex flexDirection="column">
                <FormLabel {...labelStylings} htmlFor="ndaSent">
                  Nda sent
                </FormLabel>
                <Select
                  {...selectStylings}
                  value={ndaSent}
                  onChange={(e) => setndaSent(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Select>
              </Flex>
            </Box>
          </Flex>

          <Flex {...flexDirection} {...flexGap}>
            <Box flex={1}>
              <Flex flexDirection="column">
                <FormLabel {...labelStylings} htmlFor="ndaSigned">
                  Nda signed
                </FormLabel>
                <Select
                  {...selectStylings}
                  value={ndaSigned}
                  onChange={(e) => setndaSigned(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Select>
              </Flex>
            </Box>

            <Box flex={1}>
              <Flex flexDirection="column">
                <FormLabel {...labelStylings} htmlFor="emailSetup">
                  Email setup
                </FormLabel>
                <Select
                  {...selectStylings}
                  value={emailSetup}
                  onChange={(e) => setEmailSetup(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </Select>
              </Flex>
            </Box>
          </Flex>

          <Flex {...flexDirection} {...flexGap}>
            <Box flex={1}>
              <Flex flexDirection="column">
                <FormLabel {...labelStylings} htmlFor="sendReceiveEmail">
                  Can send / receive email
                </FormLabel>
                <Select
                  {...selectStylings}
                  value={sendReceiveEmail}
                  onChange={(e) => setSendReceiveEmail(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </Select>
              </Flex>
            </Box>

            {/* <Box flex={1}>
              <Flex flexDirection="column">
                <FormLabel {...labelStylings} htmlFor='msTeamsSetup'>MS Teams setup</FormLabel>
                <Select
                {...selectStylings}
                  value={msTeamsSetup}
                  onChange={(e) => setMsTeamsSetup(e.target.value)}
                >
                  <option value='Pending'>Pending</option>
                  <option value='Complete'>Complete</option>
                </Select>
              </Flex>
            </Box>
 */}
          </Flex>

          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            marginTop="4rem"
            fontSize="1.6rem"
          >
            <Box
              height="5rem"
              width={
                isLargerThan375
                  ? isLargerThan550
                    ? isLargerThan900
                      ? '20rem'
                      : '15rem'
                    : '12rem'
                  : '11rem'
              }
              background="#5e55ef"
              border="1px solid #5e55ef"
              color="#fff"
              borderRadius="10px"
              transition="all 0.3s"
              _hover={{
                background: '#fff',
                color: '#000',
              }}
              disabled={true}
            >
              Update User
            </Box>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default UserEditScreen;
