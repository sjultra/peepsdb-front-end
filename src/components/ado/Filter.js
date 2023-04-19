import React from 'react';

import { Box, Input, Flex, useMediaQuery } from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import {
  setAdoTextFilter,
  setAdoAssignedToFilter,
  setAdoStateFilter,
} from '../../actions/adoActions';

const Filter = ({ projectWorkItems }) => {
  const dispatch = useDispatch();

  const [is500px] = useMediaQuery('(max-width: 500px)');
  console.log(is500px);

  // Styles
  const wrapperStyles = {
    justifyContent: 'space-between',
    bg: '#fcfcfc',
    h: 'auto',
    w: '100%',
    mt: '4rem',
    p: is500px ? '0 1.5rem' : '0 2.5rem',
    borderRadius: '0.4rem',
    overflowX: 'auto',
    overflowY: 'hidden',
    sx: {
      'scrollbar-width': 'none' /* IE 11 */,
      'scrollbar-width': 'none' /* Firefox 64 */,
      '&::-webkit-scrollbar': {
        width: '0',
      },
    },
  };

  const filterInputStyles = {
    p: '2rem 1.5rem',
    w: '25rem',
    ml: '7px',
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
    display: 'flex',
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

  // Selectors
  const filters = useSelector((state) => state.adoFilter);

  const { text, assignedTo, state } = filters;

  const onChangeText = (e) => {
    dispatch(setAdoTextFilter(e.target.value));
  };

  // ASSIGNED TO FILTER
  let uniqueAssignedToArr;
  if (projectWorkItems) {
    const assignedToArr = projectWorkItems.map((item) =>
      item.fields.assignedTo.displayName
        ? item.fields.assignedTo.displayName
        : 'Unassigned'
    );
    uniqueAssignedToArr = [...new Set(assignedToArr)];
  }

  const onChangeAssignedTo = (e) => {
    dispatch(setAdoAssignedToFilter(e.target.value));
  };

  // STATES FILTER
  let uniqueStateArr;
  if (projectWorkItems) {
    const stateArr = projectWorkItems.map((item) => item.fields.state);
    uniqueStateArr = [...new Set(stateArr)];
  }

  const onChangeStates = (e) => {
    dispatch(setAdoStateFilter(e.target.value));
  };

  return (
    <Flex {...wrapperStyles}>
      <Flex alignItems="center">
        <FiFilter fontSize="2rem" />
        <Input
          {...filterInputStyles}
          type="text"
          placeholder="Filter by keyword"
          value={text}
          onChange={(e) => onChangeText(e)}
        />
      </Flex>

      <Flex>
        {/* Assigned To */}
        <Box {...selectBoxStyles}>
          <Box
            as="select"
            {...selectStyles}
            name="assigned"
            value={assignedTo}
            onChange={(e) => onChangeAssignedTo(e)}
          >
            <option value="">Assigned to</option>
            {uniqueAssignedToArr &&
              uniqueAssignedToArr.map((username, index) => (
                <option value={username} key={index}>
                  {username}
                </option>
              ))}
          </Box>
        </Box>
        {/* State */}
        <Box>
          <Box
            as="select"
            {...selectStyles}
            pr="2.5rem"
            name="states"
            value={state}
            onChange={(e) => onChangeStates(e)}
          >
            <option value="">States</option>
            {uniqueStateArr &&
              uniqueStateArr.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Filter;
