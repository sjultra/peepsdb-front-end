import React from 'react';
import {
  Grid,
  Td,
  Flex,
  Box,
  useMediaQuery,
  Image,
  Tr,
  Text,
  Tbody,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

import { filteredLabelIssues } from '../../actions/jiraActions';
import { renderIfJSXExists } from '../../utils/helpers';
import useWidget from '../../hooks/useWidget';
import { formatDateTimeString } from '../../screens/Admin/audit';

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

  const {icons} = useWidget()

  const iconObject = icons('16px')

  return (
    <Tbody>
      {issues &&
        filteredLabelIssues(issues, filters).map((issue, index) => {
            return (
              <Tr  key={index}>
                <Td>
                  <Flex align={'center'} gap='0.4em'>
                    {iconObject[issue?.provider]}
                    <Text>
                        {issue?.key || issue?.id}
                    </Text>
                  </Flex>
                </Td>
                <Td lineHeight={'22px'} maxW={{base:'400px',lg:'430px'}}>
                  {issue?.summary}
                </Td>
                <Td flexDirection="row" alignItems="center">
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
                  <Text>
                    {renderIfJSXExists( issue?.assignee?.displayName, 'Unassigned')}
                  </Text>
                </Td>
                <Td flexDirection="row" alignItems="center">
                    {formatDateTimeString(issue?.updated)}
                </Td>

                <Td lineHeight={'22px'} >
                  {issue?.status}
                </Td>
                    
              </Tr>
            );
          })}
      {issues === [] && <h3>No issues</h3>}
    </Tbody>
  );
};

export default JiraIssuesContent;
