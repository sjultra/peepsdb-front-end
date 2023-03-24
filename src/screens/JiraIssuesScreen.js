import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import MainHeading from '../components/layouts/MainHeading';
import { toggleJira } from '../actions/toggleActions';
import { getLabelIssues } from '../actions/jiraActions';
import JiraIssuesContent from '../components/jira/JiraIssuesContent';
import Filter from '../components/jira/Filter';
import Spinner from '../components/layouts/Spinner';
import Message from '../components/layouts/Message';
import AdminAsideBar from "./Admin/AdminAsideBar"
import { Box } from "@chakra-ui/react"
import useGoBack from '../hooks/useGoBack';

const TableHeading = styled.div`
  display: grid;
  grid-template-columns: 5% 54% 15% 10%;
  grid-column-gap: 2rem;
  padding: 2rem 1rem 2rem 3rem;
  margin-top: 2rem;
  width:100%;
  font-weight: 500;
  min-width: 120rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #aaa;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const JiraIssuesScreen = ({ match }) => {
   const goback = useGoBack({title:`${match.params.id}`});

  const dispatch = useDispatch();

  // Selectors
  const issues = useSelector((state) => state.labelIssues.issues);
  const error = useSelector((state) => state.labelIssues.error);
  const loading = useSelector((state) => state.labelIssues.loading);
  const total = useSelector((state) => state.labelIssues.total);

  useEffect(() => {
    dispatch(toggleJira());
  }, [dispatch]);

  // Get the total result of label issues
  useEffect(() => {
    if (!issues.length) {
      dispatch(getLabelIssues(match.params.id, 0));
    } else if (issues.length && issues.length < total) {
      dispatch(getLabelIssues(match.params.id, issues.length));
    }
  }, [dispatch, match.params.id, issues, total]);
  
    console.log('issues',issues);


  return (
    <AdminAsideBar>
      {goback}

      {loading && <Spinner />}
      {error && <Message msg={error} variant="error" />}

      {issues && (
        <>
          <Box
            overflow={"auto"}
            w={{
              base: "calc(100vw - 6rem)",
              md: "calc(100vw - 4rem)",
              lg: "calc(100vw - 21vw)",
            }}>
            <Filter issues={issues} />
          </Box>
          <Box
            pb="100px"
            mt="8"
            overflow={"auto"}
            w={{
              base: "calc(100vw - 6rem)",
              md: "calc(100vw - 4rem)",
              lg: "calc(100vw - 21vw)",
            }}>
            <TableHeading>
              <div>ID</div>
              <div>Title</div>
              <div>Assigned To</div>
              <div>Status</div>
            </TableHeading>
            <JiraIssuesContent issues={issues} />
          </Box>
        </>
      )}
    </AdminAsideBar>
  )
}

export default JiraIssuesScreen
