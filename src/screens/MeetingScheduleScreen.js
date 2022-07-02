import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import MeetingScheduleContent from '../components/meeting/MeetingScheduleContent';
import Spinner from '../components/layouts/Spinner';
import { getAllProfiles } from '../actions/profileActions';
import Message from '../components/layouts/Message';
import {
  PrimaryHeading,
  ContentWrapper,
  TitleFilter,
  Filter,
} from './ScreenResources';

const TableHead = styled.div`
  background: #f8f7ff;
  height: 6rem;
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
  const dispatch = useDispatch();

  // Selectors
  const profiles = useSelector((state) => state.allProfiles.profiles);
  const loading = useSelector((state) => state.allProfiles.loading);
  const error = useSelector((state) => state.allProfiles.error);

  useEffect(() => {
    if (!profiles) {
      dispatch(getAllProfiles());
    }
  }, [profiles, dispatch]);

  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <TitleFilter>
        <PrimaryHeading className='text-primary'>
          Schedule Meeting
        </PrimaryHeading>
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
            <div>Team Members</div>
            <div>Local Times</div>
            <div>Calendly Link</div>
          </TableHead>
          <MeetingScheduleContent profiles={profiles} filterText={filterText} />
        </ContentWrapper>
      )}
    </div>
  );
};

export default MeetingScheduleScreen;
