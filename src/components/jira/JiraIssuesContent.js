import React from 'react';
import {
  Grid,
  GridItem,
  Flex,
  Box,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

import { filteredLabelIssues } from '../../actions/jiraActions';

const JiraIssuesContent = ({ issues }) => {
  // Styles
  const [is500px] = useMediaQuery('(max-width: 500px)');
  const [is600px] = useMediaQuery('(max-width: 600px)');

  const itemStyles = {
    templateColumns: '0.07fr 0.58fr 0.2fr 0.15fr',
    gap: '2rem',
    p: is500px
      ? '1.7rem 1rem 1.7rem 1rem'
      : is600px
      ? '1.7rem 1rem 1.7rem 3rem'
      : '1.2rem 1rem 1.2rem 3rem',
    borderBottom: '1px solid #f1f1f1',
    minWidth: '120rem',
    fontSize: '1.5rem',
  };

  // Sets the work item state indicator background
  const setStateIndicator = (status) => {
    const bg =
      status === 'To Do' || status === 'New'
        ? '#b2b2b2'
        : status === 'In Progress' || status === 'Doing'
        ? '#5e55ef'
        : status === 'Done'
        ? '#ff9d00'
        : '#007acc';

    return <Box as="span" style={{ bg }} />;
  };

  const stateIndicatorStyles = {
    h: '1rem',
    w: '1rem',
    display: 'inline-block',
    borderRadius: '50%',
    mr: '0.6rem',
  };

  // Selectors
  const filters = useSelector((status) => status.jiraFilter);

  const unassigned = {
    fontSize: '2rem',
    marginRight: '0.7rem',
  };

  return (
    <div>
      {issues &&
        filteredLabelIssues(issues, filters).map((issue, index) => {
            return (
              <Grid {...itemStyles} key={index}>
                <GridItem>{issue?.key || issue?.id}</GridItem>
                <GridItem fontSize={'13px'}>
                  {issue?.summary}
                  {issue?.updated}
                </GridItem>
                <Flex flexDirection="row" alignItems="center">
                  {issue?.assignee?.avatarUrl !== null && (
                    <Image
                      w="2rem"
                      borderRadius="50%"
                      marginRight="0.7rem"
                      src={issue?.assignee?.avatarUrl}
                      alt=""
                    />
                  )}
                  {issue?.assignee?.avatarUrl === null && (
                    <FaUserCircle style={unassigned} />
                  )}
                  <GridItem>
                    {issue?.assignee?.displayName !== null
                      ? issue?.assignee?.displayName
                      : 'Unassigned'}
                  </GridItem>
                </Flex>
                <Flex flexDirection="row" alignItems="center">
                  <Box
                    as="span"
                    {...stateIndicatorStyles}
                    bg={setStateIndicator(issue?.status).props.style.bg}
                  />
                  <Box as="span">{issue?.status}</Box>
                </Flex>
              </Grid>
            );
          })}
      {issues === [] && <h3>No issues</h3>}
    </div>
  );
};

export default JiraIssuesContent;
