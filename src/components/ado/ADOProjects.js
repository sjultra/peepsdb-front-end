import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import {
  getAdoProjects,
  getAllWorkItemsId,
  getAllWorkItemsDetails,
} from '../../actions/adoActions';
import Spinner from '../layouts/Spinner';
import Message from '../layouts/Message';
import ADOProjectContent from './ADOProjectContent';

const Wrapper = styled.div`
  margin-top: 4rem;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5rem;
  box-shadow: 0 0 5px #e7e6f6;
  border-radius: 1rem;
  padding: 0.5rem 0.3rem;
  width: 30rem;
  padding-left: 1rem;

  > *:first-child {
    font-size: 1.8rem;
    color: #6f6f74;
  }

  input {
    padding: 0.2rem 0.5rem;
    border: 0;
    outline: 0;
    width: 25rem;
    margin-left: 0.5rem;
  }
`;

const ADOProjects = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  // Selectors
  const projects = useSelector((state) => state.adoProjects.projects);
  const loading = useSelector((state) => state.adoProjects.loading);
  const error = useSelector((state) => state.adoProjects.error);
  const workItems = useSelector(
    (state) => state.allWorkItemsDetails.workItemsDetails
  );
  const workItemsId = useSelector((state) => state.allWorkItemsId.workItemsId);
  const allWorkItemsDetails = useSelector(
    (state) => state.allWorkItemsDetails.workItemsDetails
  );

  // Get all ADO Projects
  useEffect(() => {
    if (!projects) {
      dispatch(getAdoProjects());
    }
  }, [projects, dispatch]);

  // Get all workitems id
  useEffect(() => {
    if (!workItemsId) {
      dispatch(getAllWorkItemsId());
    }
  }, [workItemsId, dispatch]);

  // Get all workitems details
  useEffect(() => {
    if (!allWorkItemsDetails) {
      let ids;
      if (workItemsId) {
        ids = workItemsId.map((item) => item.id);
        dispatch(getAllWorkItemsDetails(ids));
      }
    }
  }, [allWorkItemsDetails, dispatch, workItemsId]);

  return (
    <Wrapper>
      {loading && <Spinner />}
      {error && <Message msg={error.msg} variant='error' />}

      {projects && (
        <Search>
          <FiSearch />
          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      )}

      {projects && (
        <ADOProjectContent
          projects={projects}
          search={search}
          workItems={workItems}
        />
      )}
    </Wrapper>
  );
};

export default ADOProjects;
