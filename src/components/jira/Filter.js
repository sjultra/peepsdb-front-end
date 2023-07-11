import React from 'react';
import { Box, Input, Flex, useMediaQuery } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import { FiFilter } from 'react-icons/fi';
import {
  setJiraTextFilter,
  setJiraAssignedToFilter,
  setJiraStatusFilter,
} from '../../actions/jiraActions';



const Filter = ({ issues }) => {
  // Styles
  const [is500px] = useMediaQuery('(max-width: 500px)');

  const wrapperStyles = {
    justifyContent: 'space-between',
    alignItems: 'center',
    bg: '#fcfcfc',
    h: 'auto',
    mt: '4rem',
    p: is500px ? '0 1.5rem' : '0 2.5rem',
    borderRadius: '0.4rem',
    border: '1px solid #f7f7f7',
    sx: {
      '-ms-scrollbar-width': 'none' /* IE 11 */,
      'scrollbar-width': 'none' /* Firefox 64 */,
      '&::-webkit-scrollbar': {
        width: '0',
      },
    },
  };

  const filterInputStyles = {
    p: '2rem 1.5rem',
    w: '25rem',
    ml: '3px',
    fontSize: '1.6rem',
    outline: 'none',
    border: 'none',
    borderRadius: '100px',
    bg: '#f8f7ff',
    _focus: {
      boxShadow: 'none',
    },
  };

  const selectBoxStyles = {
    position: 'relative',
    h: '100%',
    w: '100%',
    flexDirection: 'row',
  };

  const selectStyles = {
    w: 'auto',
    h: '100%',
    p: '1.5rem',
    borderRadius: '0.3rem',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif !important",
    fontSize: '1.6rem',
    bg: 'none',
    border: 'none',
    outline: 'none',
    _hover: {
      bg: '#e9e7f5',
    },
    _focus: {
      bg: '#e3e1f1',
    },
  };

  const dispatch = useDispatch();

  // Selectors
  const filters = useSelector((state) => state.jiraFilter);

  const { text, assignedTo, status } = filters;

  const onChangeText = (e) => {
    dispatch(setJiraTextFilter(e.target.value));
  };

  // ASSIGNED TO FILTER
  let uniqueAssignedToArr;
  if (issues) {

    console.log('issues field mapped',issues[0])

    const assignedToArr = issues.map((item) =>
      item?.assignee.displayName
        ? item?.assignee.displayName
        : 'Unassigned'
    );
    uniqueAssignedToArr = [...new Set(assignedToArr)];
  }

  const onChangeAssignedTo = (e) => {
    dispatch(setJiraAssignedToFilter(e.target.value));
  };

  // STATUS FILTER
  let uniqueStatusArr;
  if (issues) {
    const statusArr = issues.map((item) => item?.status);
    uniqueStatusArr = [...new Set(statusArr)];
  }

  const onChangeStatus = (e) => {
    dispatch(setJiraStatusFilter(e.target.value));
  };

  return (
    <Flex {...wrapperStyles}>
      <Flex flexDirection="row" alignitems="center">
        <Box as={FiFilter} mt="1rem" mr="0.4rem" fontSize="2rem" />
        <Input
          {...filterInputStyles}
          type="text"
          placeholder="Filter by keyword"
          value={text}
          onChange={(e) => onChangeText(e)}
        />
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        {/* Assigned To */}
        <Flex {...selectBoxStyles}>
          <Box
            as="select"
            {...selectStyles}
            name="assigned"
            value={assignedTo}
            onChange={(e) => onChangeAssignedTo(e)}
          >
            <option value="">Assigned To</option>
            {uniqueAssignedToArr &&
              uniqueAssignedToArr.map((username, index) => (
                <option value={username} key={index}>
                  {username}
                </option>
              ))}
          </Box>
        </Flex>
        {/* Status */}
        <Flex {...selectBoxStyles}>
          <Box
            as="select"
            {...selectStyles}
            name="status"
            value={status}
            onChange={(e) => onChangeStatus(e)}
          >
            <option value="">Status</option>
            {uniqueStatusArr &&
              uniqueStatusArr.map((status, index) => (
                <option value={status} key={index}>
                  {status}
                </option>
              ))}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Filter;
