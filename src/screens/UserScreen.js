import { useEffect, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../components/layouts/Spinner';
// import Message from '../components/layouts/Message';
import UserContent from '../components/user/UserContent';
import useTeams from '../hooks/useTeams';
import useAuth  from '../hooks/useAuth';
import { useState } from 'react';
import { capitalizeString } from '../utils/helpers';
import useWidget from '../hooks/useWidget';
import UserEditScreen from './UserEditScreen';
import { Flex, Text } from '@chakra-ui/react';


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
    font-size: 4.5rem;
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
  const {profile} = useAuth();

  const {fetchUserProfile} = useTeams();

  const [user,setUser]  = useState(undefined)

  const {loading,openModal} = useWidget();

  const fetchUserRef = useRef(fetchUserProfile)

  const id = match?.params?.id

  useEffect(() => {
    (
      async()=>{
        let fetchUser =await fetchUserRef.current(id);

        if (fetchUser?.data) {
          setUser(fetchUser?.data);
        }
        else{
          console.error(fetchUser.error);
        }
      }
    )()
  }, [id]);

  const firstname = capitalizeString(user?.firstName)



  if (!id  && profile?.role !== 'Admin') {
    console.log('redirect back to home at userscren')
    return <Redirect to='/' />;
  }
  return (
    <div>
      <TitleEdit>
        <PrimaryHeading className='text-primary'>
          {firstname ? firstname : 'User'}
        </PrimaryHeading>
        {user && (
          <StyledLink>

              <Flex p='0.4em 1em' borderRadius={'6px'} color={'white'} 
               gap='0.5em' bg='var(--primary-color)' my='0.8em' align={'center'}
               onClick={()=>{
                openModal({
                  children:UserEditScreen,
                  payload:user,
                  size:'4xl'
                })} 
                }
               >
                <Text fontSize={'19px'}> Edit User</Text>
                <FiEdit fontSize={'22px'} />
              </Flex>


          </StyledLink>
        )}
      </TitleEdit>

      {loading && <Spinner />}

      {user && (
        <ContentWrapper>
          <TableHead>
            <li>Onboarding Process</li>
            <li>Status</li>
          </TableHead>
          <UserContent user={user} />
        </ContentWrapper>
      )}
    </div>
  );
};

export default UserScreen;
