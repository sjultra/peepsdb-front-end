import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
  updateUserOnboardStatus,
} from '../actions/onboardActions';
import Spinner from '../components/layouts/Spinner';
import Message from '../components/layouts/Message';
import {
  Wrapper,
  PrimaryHeading,
  FormControl,
  BtnNext,
} from '../components/form/FormResources';

const UserName = styled.div`
  > div:first-child {
    margin: 2rem 0 1rem 0;
  }

  > div:last-child {
    height: 50px;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
    padding: 0 2rem;
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

const UserEditScreen = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Selectors
  const onboardStatus = useSelector((state) => state.onboardStatus);
  const user = useSelector((state) => state.userInfo.user);

  const { loading, error, userStatus } = onboardStatus;

  // State
  const [role, setRole] = useState(userStatus && userStatus.role);
  const [mutualNdaSent, setMutualNdaSent] = useState(
    userStatus && userStatus.mutualNdaSent
  );
  const [mutualNdaSigned, setMutualNdaSigned] = useState(
    userStatus && userStatus.mutualNdaSigned
  );
  const [emailSetup, setEmailSetup] = useState(
    userStatus && userStatus.emailSetup
  );
  const [sendReceiveEmail, setSendReceiveEmail] = useState(
    userStatus && userStatus.sendReceiveEmail
  );
  const [msTeamsSetup, setMsTeamsSetup] = useState(
    userStatus && userStatus.msTeamsSetup
  );

  // Capitalize names
  const firstname =
    userStatus &&
    userStatus.firstname[0].toUpperCase() + userStatus.firstname.slice(1);

  const lastname =
    userStatus &&
    userStatus.lastname[0].toUpperCase() + userStatus.lastname.slice(1);

  const onSubmitHandler = () => {
    // dispatch to onboard route to update
    const formData = {
      user: match.params.id,
      role,
      mutualNdaSent,
      mutualNdaSigned,
      emailSetup,
      sendReceiveEmail,
      msTeamsSetup,
    };

    dispatch(updateUserOnboardStatus(formData));
    history.push(`/admin/users/${match.params.id}`);
  };

  // Ensure the page is only accessible by Admins & redirect on refresh
  if (user && user.role !== 'Admin') {
    return <Redirect to='/' />;
  } else if (!loading && !userStatus) {
    return <Redirect to={`/admin/users/${match.params.id}`} />;
  }

  return (
    <Wrapper>
      <PrimaryHeading className='text-center text-primary'>
        Edit User
      </PrimaryHeading>

      {loading && <Spinner />}
      {error && error.msg && <Message msg={error.msg} variant='error' />}

      {userStatus && (
        <UserName>
          <div>Name</div>
          <div>
            {firstname} {lastname}
          </div>
        </UserName>
      )}

      {userStatus && (
        <form onSubmit={onSubmitHandler}>
          <FormControl>
            <label htmlFor='role'>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='Guest'>Guest</option>
              <option value='Freelancer'>Freelancer</option>
              <option value='Staff'>Staff</option>
              <option value='Admin'> Admin</option>
            </select>
          </FormControl>
          <FormControl>
            <label htmlFor='mutualNdaSent'>Mutual NDA sent</label>
            <select
              value={mutualNdaSent}
              onChange={(e) => setMutualNdaSent(e.target.value)}
            >
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </FormControl>
          <FormControl>
            <label htmlFor='mutualNdaSigned'>Mutual NDA signed</label>
            <select
              value={mutualNdaSigned}
              onChange={(e) => setMutualNdaSigned(e.target.value)}
            >
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </FormControl>
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
          <BtnWrapper>
            <BtnNext>SUBMIT</BtnNext>
          </BtnWrapper>
        </form>
      )}
    </Wrapper>
  );
};

export default UserEditScreen;
