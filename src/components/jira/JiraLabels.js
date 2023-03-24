import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import {
  getJiraLabels,
  getAllIssues,
  clearLabelIssues,
} from '../../actions/jiraActions';
import Spinner from '../layouts/Spinner';
import JiraLabelContent from './JiraLabelContent';
import Message from '../layouts/Message';
import useAxios from '../../hooks/useAxios';
import { Box } from "@chakra-ui/react";

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #f7f7f7;
  padding: 1rem 0.3rem;
  background: #fcfcfc;
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

const JiraLabels = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const Axios = useAxios();


  const axiosRef = useRef(Axios)

  // Selectors
  const labels = useSelector((state) => state.jiraLabels.labels);
  const loading = useSelector((state) => state.jiraLabels.loading);
  const error = useSelector((state) => state.jiraLabels.error);
  const issues = useSelector((state) => state.allIssues.issues);
  const total = useSelector((state) => state.allIssues.total);

  const labelRef = useRef(labels);
  // Get all Jira Labels
  
  const issuesRef = useRef(issues);

  useEffect(() => {
    if (!labelRef.current) {
      dispatch(getJiraLabels(axiosRef.current));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!issuesRef.current.length ) {
      dispatch(getAllIssues(0,axiosRef.current));
    } 
  }, [dispatch, total]);

  useEffect(() => {
    dispatch(clearLabelIssues());
  }, [dispatch]);

  return (
    <Box mt="2rem">
      {loading && <Spinner />}
      {error && <Message msg={error.msg} variant='error' />}

        {labels && (
        <Search>
          <FiSearch />
          <input
            type='text'
            style={{ background: "transparent" }}
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      )}

      {labels && (
        <JiraLabelContent
          labels={labels}
          search={search}
          loading={loading}
          issues={issues}
          total={total}
        />
      )}
      
    </Box>
  );
};

export default JiraLabels;
