import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  updateUserOnboardStatus,
} from '../actions/onboardActions';
import Spinner from '../components/layouts/Spinner';
import {
  PrimaryHeading,
  FormControl,
  BtnNext,
} from '../components/form/Onboarding/FormResources';
import useWidget from '../hooks/useWidget';
import { Box, Flex } from '@chakra-ui/react';
import { capitalizeString } from '../utils/helpers';

const UserName = styled.div`
  > div:first-child {
    margin: 2rem 0 1rem 0;
  }

  > div:last-child {
    height: 50px;
    /* padding: 0 2rem; */
    display: flex;
    align-items: center;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  font-size: 1.6rem;
`;

const UserEditScreen = ({ payload }) => {
  const dispatch = useDispatch();
  //hooks
  
  const {loading} = useWidget()

  const {profile:user,
    // onboard
  } =payload;

  const {firstName, lastName} =user;


  // State


  // const [userData,setUserData] = useState({
  //   role: user?.role || '' ,
  // })

  const [role, setRole] = useState(user && user.role);
  const [ndaSent, setndaSent] = useState(
    user && user.ndaSent
  );
  const [ndaSigned, setndaSigned] = useState(
    user && user.ndaSigned
  );
  const [emailSetup, setEmailSetup] = useState(
    user && user.emailSetup
  );
  const [sendReceiveEmail, setSendReceiveEmail] = useState(
    user && user.sendReceiveEmail
  );
  const [msTeamsSetup, setMsTeamsSetup] = useState(
    user && user.msTeamsSetup
  );

  2+2===5 && console.log(setMsTeamsSetup)

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

  const flexDirection={
    direction:{base:'column',lg:'row'}
  }  
  
  const flexGap= {
    gap:'1.5em'
  }

  return (
    <Box className='editUser' pb='2rem'>
      <PrimaryHeading className='text-center text-primary'>
        Edit User
      </PrimaryHeading>

      {loading && <Spinner />}

      {user && (
        <UserName>
          <div>Name</div>
          <div>
            {capitalizeString(firstName)} {capitalizeString(lastName)}
          </div>
        </UserName>
      )}

      {user && (
        <form onSubmit={onSubmitHandler}>

          <Flex {...flexDirection}  {...flexGap}>

            <Box flex={1}>
              <FormControl>
                <label htmlFor='role'>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value='Guest'>Guest</option>
                  <option value='Freelancer'>Freelancer</option>
                  <option value='Staff'>Staff</option>
                  <option value='Admin'> Admin</option>
                </select>
              </FormControl>
            </Box>

            <Box flex={1}>

              <FormControl>
                <label htmlFor='ndaSent'> Nda sent</label>
                <select
                  value={ndaSent}
                  onChange={(e) => setndaSent(e.target.value)}
                >
                  <option value='No'>No</option>
                  <option value='Yes'>Yes</option>
                </select>
              </FormControl>

            </Box>

          </Flex>       
          
          <Flex {...flexDirection} {...flexGap}>

            <Box flex={1}>
              <FormControl>
                <label htmlFor='ndaSigned'> Nda signed</label>
                <select
                  value={ndaSigned}
                  onChange={(e) => setndaSigned(e.target.value)}
                >
                  <option value='No'>No</option>
                  <option value='Yes'>Yes</option>
                </select>
              </FormControl>
            </Box>
    
            <Box flex={1}>
              <FormControl>
                <label htmlFor='emailSetup'>Email setup</label>
                <select
                  value={emailSetup}
                  onChange={(e) => setEmailSetup(e.target.value)}
                >
                  <option value='Pending'>Pending</option>
                  <option value='Complete'>Complete</option>
                </select>
              </FormControl>
            </Box>
   
          </Flex>

          
          <Flex {...flexDirection} {...flexGap}>

            <Box flex={1}>
              <FormControl>
                <label htmlFor='sendReceiveEmail'>Can send / receive email</label>
                <select
                  value={sendReceiveEmail}
                  onChange={(e) => setSendReceiveEmail(e.target.value)}
                >
                  <option value='Pending'>Pending</option>
                  <option value='Complete'>Complete</option>
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

          <BtnWrapper>
            <BtnNext disabled={true}>Update User</BtnNext>
          </BtnWrapper>
   
        </form>
      )}
    </Box>
  );
};

export default UserEditScreen;
