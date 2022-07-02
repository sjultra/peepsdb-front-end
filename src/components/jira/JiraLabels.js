import React, { useState, useEffect } from 'react';
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

const JiraLabels = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  // Selectors
  const labels = useSelector((state) => state.jiraLabels.labels);
  const loading = useSelector((state) => state.jiraLabels.loading);
  const error = useSelector((state) => state.jiraLabels.error);
  const issues = useSelector((state) => state.allIssues.issues);
  const total = useSelector((state) => state.allIssues.total);

  // Get all Jira Labels
  useEffect(() => {
    if (!labels) {
      dispatch(getJiraLabels());
    }
  }, [labels, dispatch]);

  useEffect(() => {
    if (!issues.length) {
      dispatch(getAllIssues(0));
    } else if (issues.length && issues.length < total) {
      dispatch(getAllIssues(issues.length));
    }
  }, [dispatch, issues, total]);

  useEffect(() => {
    dispatch(clearLabelIssues());
  }, [dispatch]);

  return (
    <Wrapper>
      {loading && <Spinner />}
      {error && <Message msg={error.msg} variant='error' />}

      {labels && (
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

      {labels && (
        <JiraLabelContent
          labels={labels}
          search={search}
          loading={loading}
          issues={issues}
          total={total}
        />
      )}
    </Wrapper>
  );
};

export default JiraLabels;
