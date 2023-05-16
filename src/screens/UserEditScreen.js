import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserOnboardStatus } from '../actions/onboardActions';
import Spinner from '../components/layouts/Spinner';
import { FormControl } from '../components/form/Onboarding/FormResources';
import useWidget from '../hooks/useWidget';
import { useMediaQuery, Box, Flex } from '@chakra-ui/react';
import { capitalizeString } from '../utils/helpers';

const UserEditScreen = ({ payload }) => {
  // Media Query Stylings
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const [isLargerThan550] = useMediaQuery('(min-width: 550px)');
  const [isLargerThan375] = useMediaQuery('(min-width: 375px)');

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
              <FormControl>
                <label htmlFor="role">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Guest">Guest</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin"> Admin</option>
                </select>
              </FormControl>
            </Box>

            <Box flex={1}>
              <FormControl>
                <label htmlFor="ndaSent"> Nda sent</label>
                <select
                  value={ndaSent}
                  onChange={(e) => setndaSent(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </FormControl>
            </Box>
          </Flex>

          <Flex {...flexDirection} {...flexGap}>
            <Box flex={1}>
              <FormControl>
                <label htmlFor="ndaSigned"> Nda signed</label>
                <select
                  value={ndaSigned}
                  onChange={(e) => setndaSigned(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </FormControl>
            </Box>

            <Box flex={1}>
              <FormControl>
                <label htmlFor="emailSetup">Email setup</label>
                <select
                  value={emailSetup}
                  onChange={(e) => setEmailSetup(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
              </FormControl>
            </Box>
          </Flex>

          <Flex {...flexDirection} {...flexGap}>
            <Box flex={1}>
              <FormControl>
                <label htmlFor="sendReceiveEmail">
                  Can send / receive email
                </label>
                <select
                  value={sendReceiveEmail}
                  onChange={(e) => setSendReceiveEmail(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
              </FormControl>
            </Box>

            {/* <Box flex={1}>
              <FormControl>
                <label htmlFor='msTeamsSetup'>MS Teams setup</label>
                <select
                  value={msTeamsSetup}
                  onChange={(e) => setMsTeamsSetup(e.target.value)}
                >
                  <option value='Pending'>Pending</option>
                  <option value='Complete'>Complete</option>
                </select>
              </FormControl>
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
