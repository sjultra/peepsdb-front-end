import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import UsersContent from '../../components/users/UsersContent';
import Spinner from '../../components/layouts/Spinner';
import {
  PrimaryHeading,
  ContentWrapper,
  TitleFilter,
  Filter,
} from '../ScreenResources';
import useTeams from '../../hooks/useTeams';
import useWidget from '../../hooks/useWidget';
// import useAuth from '../hooks/useAuth';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const TableHead = styled.ul`
  background: #f8f7ff;
  height: 6rem;
  display: grid;
  grid-template-columns: 0.26fr 0.34fr 0.2fr 0.2fr;
  grid-column-gap: 3rem;
  align-items: center;
  border-radius: 0.4rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding: 1.7rem 1rem 1.7rem 3rem;
  /* min-width: 120rem; */
  font-weight: 500;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const UsersScreen = () => {

  // Selectors

  const {profiles,fetchAllProfiles} = useTeams()
  const {loading} = useWidget();
  const fetchProfilesRef = useRef(fetchAllProfiles);

  
  useEffect(() => {
    if (!profiles?.length) {
      fetchProfilesRef.current()
    }
  }, [profiles]);

  const [filterText, setFilterText] = useState('');

  // Ensure the page is only accessible by Admins
  // if (user && user.role !== 'Admin') {
  //   return <Redirect to='/' />;
  // }

  return (
    <div>
      <TitleFilter>
        <PrimaryHeading className='text-primary'>Users </PrimaryHeading>

        {(
          <Filter>
            <BiSearch />
            <input
              type='text'
              placeholder='Search...'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Filter>
        )}
      </TitleFilter>

      {loading && <Spinner />}
      {/* {error && error.msg && <Message msg={error.msg} variant='error' />} */}

      {profiles?.length && (
        
        <>
        <TableContainer mt='1em'>
          <Table variant='simple'>
    
            <Thead>
              <Tr>
                <Th py='0.8em' fontSize={'14px'}>Name</Th>
                <Th py='0.8em'  fontSize={'14px'}>Role</Th>
                <Th py='0.8em' fontSize={'14px'} >Sign Up Date</Th>
                <Th py='0.8em' fontSize={'14px'}>Onboarding</Th>
                {/* <Th>Action</Th> */}
              </Tr>


            </Thead>
            <UsersContent profiles={profiles} filterText={filterText} />
    
          </Table>
        </TableContainer>

        </>
      )}
    </div>
  );
};

export default UsersScreen;
