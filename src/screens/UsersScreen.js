import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import UsersContent from '../components/users/UsersContent';
import { getAllProfiles } from '../actions/profileActions';
import Message from '../components/layouts/Message';
import Spinner from '../components/layouts/Spinner';
import {
  PrimaryHeading,
  ContentWrapper,
  TitleFilter,
  Filter,
} from './ScreenResources';

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
  min-width: 120rem;
  font-weight: 500;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const UsersScreen = () => {
  const dispatch = useDispatch();

  // Selectors
  const profiles = useSelector((state) => state.allProfiles.profiles);
  const error = useSelector((state) => state.allProfiles.error);
  const loading = useSelector((state) => state.allProfiles.loading);
  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!profiles) {
      dispatch(getAllProfiles());
    }
  }, [dispatch, profiles]);

  const [filterText, setFilterText] = useState('');

  // Ensure the page is only accessible by Admins
  if (user && user.role !== 'Admin') {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <TitleFilter>
        <PrimaryHeading className='text-primary'>Users </PrimaryHeading>

        {!error && (
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
      {error && error.msg && <Message msg={error.msg} variant='error' />}

      {profiles && (
        <ContentWrapper>
          <TableHead>
            <li>Name</li>
            <li>Email</li>
            <li>Role</li>
            <li>Status</li>
          </TableHead>
          <UsersContent profiles={profiles} filterText={filterText} />
        </ContentWrapper>
      )}
    </div>
  );
};

export default UsersScreen;
