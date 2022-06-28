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

const ContentWrapper = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const TableHeading = styled.div`
  display: grid;
  grid-template-columns: 0.07fr 0.58fr 0.2fr 0.15fr;
  grid-column-gap: 2rem;
  padding: 2rem 1rem 2rem 3rem;
  margin-top: 2rem;
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

  return (
    <div>
      <MainHeading title={match.params.id} />

      {loading && <Spinner />}
      {error && <Message msg={error} variant='error' />}

      {issues && (
        <>
          <Filter issues={issues} />
          <ContentWrapper>
            <TableHeading>
              <div>ID</div>
              <div>Title</div>
              <div>Assigned To</div>
              <div>Status</div>
            </TableHeading>
            <JiraIssuesContent issues={issues} />
          </ContentWrapper>
        </>
      )}
    </div>
  );
};

export default JiraIssuesScreen;
