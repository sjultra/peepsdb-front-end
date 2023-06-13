import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, GridItem, Box, useMediaQuery } from '@chakra-ui/react';

import { toggleJira } from '../actions/toggleActions';
import { getLabelIssues } from '../actions/jiraActions';

import JiraIssuesContent from '../components/jira/JiraIssuesContent';
import Filter from '../components/jira/Filter';
import Spinner from '../components/layouts/Spinner';
import Message from '../components/layouts/Message';
import useGoBack from '../hooks/useGoBack';
import NavLayout from '../components/layouts/NavLayout';

const JiraIssuesScreen = ({ match }) => {
  // Styles
  const [is500px] = useMediaQuery('(max-width: 500px)');
  const [is600px] = useMediaQuery('(max-width: 600px)');

  const tableHeadingStyles = {
    templateColumns: '0.07fr 0.58fr 0.2fr 0.15fr',
    gap: '2rem',
    p: is500px
      ? '1.7rem 1rem 1.7rem 1rem'
      : is600px
      ? 'padding: 1.7rem 1rem 1.7rem 1rem'
      : '2rem 1rem 2rem 3rem',
    mt: '2rem',
    mb: '1rem',
    fontWeight: '500',
    minWidth: '120rem',
    borderBottom: '1px solid #aaa',
  };

  const goback = useGoBack({ title: `${match.params.id}` });

  const dispatch = useDispatch();

  // Selectors
  const issues = useSelector((state) => state.labelIssues.issues);
  const error = useSelector((state) => state.labelIssues.error);
  const loading = useSelector((state) => state.labelIssues.loading);
  const total = useSelector((state) => state.labelIssues.total);
  // const label = useSelector((state)=>state?.labelIssues?.label)

  useEffect(() => {
    dispatch(toggleJira());
  }, [dispatch]);

  // Get the total result of label issues
  useEffect(() => {
  
    if (!issues.length ) {
      dispatch(getLabelIssues(match.params.id, 0));
    } else if (issues.length && issues.length < total) {
      dispatch(getLabelIssues(match.params.id, issues.length));
    }
  }, [dispatch, match.params.id, issues, total]);

  console.log('issues', match);

  return (
    <Box px={['5px', '40px', '40px']}>
      <NavLayout displayAsidebar={false}>
        {goback}

        {loading && <Spinner />}
        {error && <Message msg={error} variant="error" />}

        {issues && (
          <>
            <Filter issues={issues} />
            <Box
              sx={{
                'overflow-x': 'auto',
                ' -ms-overflow-style': 'none' /* IE 11 */,
                'scrollbar-width': 'none' /* Firefox 64 */,

                '&::-webkit-scrollbar': {
                  width: 0,
                },
              }}
            >
              <Grid {...tableHeadingStyles}>
                <GridItem>ID</GridItem>
                <GridItem>Title</GridItem>
                <GridItem>Assigned To</GridItem>
                <GridItem>Status</GridItem>
              </Grid>
              <JiraIssuesContent issues={issues} />
            </Box>
          </>
        )}
      </NavLayout>
    </Box>
  );
};

export default JiraIssuesScreen;
