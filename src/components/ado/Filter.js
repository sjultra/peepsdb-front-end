import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FiFilter } from 'react-icons/fi';
import { IoChevronDown } from 'react-icons/io5';
import {
  setAdoTextFilter,
  setAdoAssignedToFilter,
  setAdoStateFilter,
} from '../../actions/adoActions';

const Wrapper = styled.div`
  background: #f8f7ff;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.4rem;
  margin-top: 4rem;
  padding: 0 2.5rem;

  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 500px) {
    padding: 0 1.5rem;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > *:first-child {
    font-size: 2rem;
  }

  input {
    padding: 0.8rem 1.5rem;
    outline: 0;
    width: 25rem;
    border: 0;
    outline: 0;
    background: #f8f7ff;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > *:first-child {
    margin-right: 1rem;
  }
`;

const CustomSelect = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  width: 18rem;

  select {
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 0.3rem;
    appearance: none;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    background: none;
    border: none;
    outline: none;

    &:hover {
      background: #e9e7f5;
    }

    &:focus {
      background: #e3e1f1;
    }
  }
`;

const CustomArrow = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  pointer-events: none;
`;

const Filter = ({ projectWorkItems }) => {
  const dispatch = useDispatch();

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
    <Wrapper>
      <InputField>
        <FiFilter />
        <input
          type='text'
          placeholder='Filter by keyword'
          value={text}
          onChange={(e) => onChangeText(e)}
        />
      </InputField>

      <Filters>
        <CustomSelect>
          <select
            name='assigned'
            value={assignedTo}
            onChange={(e) => onChangeAssignedTo(e)}
          >
            <option value=''>Assigned to</option>
            {uniqueAssignedToArr &&
              uniqueAssignedToArr.map((username, index) => (
                <option value={username} key={index}>
                  {username}
                </option>
              ))}
          </select>
          <CustomArrow>
            <IoChevronDown />
          </CustomArrow>
        </CustomSelect>

        <CustomSelect>
          <select
            name='states'
            value={state}
            onChange={(e) => onChangeStates(e)}
          >
            <option value=''>States</option>
            {uniqueStateArr &&
              uniqueStateArr.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
          </select>
          <CustomArrow>
            <IoChevronDown />
          </CustomArrow>
        </CustomSelect>
      </Filters>
    </Wrapper>
  );
};

export default Filter;
