<<<<<<< HEAD
  import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
=======
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
>>>>>>> e5ca352b3283e3decb836ea9c6e4bd184c1ed25e
import {
  getJiraLabels,
  getAllIssues,
  clearLabelIssues,
} from '../../actions/jiraActions';
import Spinner from '../layouts/Spinner';
import JiraLabelContent from './JiraLabelContent';
import Message from '../layouts/Message';
import useAxios from '../../hooks/useAxios';
import { Box, Flex } from '@chakra-ui/react';

const JiraLabels = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const Axios = useAxios();
  const axiosRef = useRef(Axios);

  // Selectors
  const labels = useSelector((state) => state.jiraLabels.labels);
  const loading = useSelector((state) => state.jiraLabels.loading);
  const error = useSelector((state) => state.jiraLabels.error);
  const issues = useSelector((state) => state.allIssues.issues);
  const total = useSelector((state) => state.allIssues.total);

<<<<<<< HEAD
  const labelRef = useRef(labels)
  
  const issuesRef = useRef(issues)
=======
  const labelRef = useRef(labels);
  // Get all Jira Labels

  const issuesRef = useRef(issues);
>>>>>>> e5ca352b3283e3decb836ea9c6e4bd184c1ed25e

  useEffect(() => {
    if (!labelRef.current) {
      dispatch(getJiraLabels(axiosRef.current));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!issuesRef.current.length) {
      dispatch(getAllIssues(0, axiosRef.current));
    }
  }, [dispatch, total]);

  useEffect(() => {
    dispatch(clearLabelIssues());
  }, [dispatch]);

  return (
    <Box mt="2rem">
      {loading && <Spinner />}
      {error && <Message msg={error.msg} variant="error" />}

      {labels && (
        <Flex
          align={'center'}
          gap="2"
          bg="#fcfcfc"
          w={['full', '30rem']}
          border="1px solid #f7f7f7"
          borderRadius="100px"
          px="1.3rem"
          py="0.5rem"
        >
          <FiSearch color="#6f6f74" />
          <input
            type="text"
            style={{
              background: 'transparent',
              outline: 'none',
              width: '100%',
              padding: '0.5rem',
            }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
      )}

      {labels && (
        <JiraLabelContent
          labels={labels}
          search={search}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default JiraLabels;
