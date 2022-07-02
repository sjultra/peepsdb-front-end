import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { getUserOnboardStatus } from '../actions/onboardActions';
import styled from 'styled-components';
import Spinner from '../components/layouts/Spinner';
import Message from '../components/layouts/Message';
import UserContent from '../components/user/UserContent';

const TitleEdit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled.div`
  font-size: 2.5rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const PrimaryHeading = styled.h1`
  margin: 2rem 0;

  @media (max-width: 1000px) {
    font-size: 3rem;
  }

  @media (max-width: 800px) {
    font-size: 2.9rem;
  }

  @media (max-width: 600px) {
    font-size: 2.8rem;
  }

  @media (max-width: 500px) {
    font-size: 2.6rem;
  }

  @media (max-width: 450px) {
    font-size: 2.5rem;
  }

  @media (max-width: 400px) {
    font-size: 2.4rem;
  }
`;

const ContentWrapper = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const TableHead = styled.ul`
  background: #f8f7ff;
  height: 6rem;
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  grid-column-gap: 3rem;
  align-items: center;
  border-radius: 0.4rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding: 1.7rem 1rem 1.7rem 3rem;
  min-width: 70rem;
  font-weight: 500;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const UserScreen = ({ match }) => {
  const dispatch = useDispatch();

  // Selectors
  const userStatus = useSelector((state) => state.onboardStatus.userStatus);
  const loading = useSelector((state) => state.onboardStatus.loading);
  const error = useSelector((state) => state.onboardStatus.error);

  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    dispatch(getUserOnboardStatus(match.params.id));
  }, [dispatch, match.params.id]);

  const firstname =
    userStatus &&
    userStatus.firstname[0].toUpperCase() + userStatus.firstname.slice(1);

      // Ensure the page is only accessible by Admins
  if (user && user.role !== 'Admin') {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <TitleEdit>
        <PrimaryHeading className='text-primary'>
          {firstname ? firstname : 'User'}
        </PrimaryHeading>
        {userStatus && (
          <StyledLink>
            <Link to={`/admin/users/${match.params.id}/edit`}>
              <FaEdit />
            </Link>
          </StyledLink>
        )}
      </TitleEdit>

      {loading && <Spinner />}
      {error && error.msg && <Message msg={error.msg} variant='error' />}

      {userStatus && (
        <ContentWrapper>
          <TableHead>
            <li>Onboarding Process</li>
            <li>Status</li>
          </TableHead>
          <UserContent userStatus={userStatus} />
        </ContentWrapper>
      )}
    </div>
  );
};

export default UserScreen;
