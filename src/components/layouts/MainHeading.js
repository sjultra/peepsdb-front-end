import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleAdo, toggleJira } from '../../actions/toggleActions';
import { Stack } from "@chakra-ui/react"

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .ado,
  .jira {
    width: 10rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (max-width: 800px) {
      width: 9rem;
      height: 4.5rem;
    }

    @media (max-width: 600px) {
      width: 8rem;
      height: 4rem;
    }

    @media (max-width: 500px) {
      width: 7.5rem;
      height: 3.75rem;
    }
  }

  .ado:first-child {
    border-radius: 3rem 0 0 3rem;
  }

  .jira:last-child {
    border-radius: 0 3rem 3rem 0;
  }
`;

const AdoToggle = styled.div`
  background: ${(props) =>
    props.ado ==='ADO Projects' ? 'rgba(95, 85, 239, 0.75)' : 'rgba(95, 85, 239, 0.08)'};
  color: ${(props) => (props.ado ? '#fff' : '#000')};
  font-weight: ${(props) => (props.ado ? '600' : '#400')};
`;

const JiraToggle = styled.div`
  background: ${(props) =>
    props.jira ==='Jira Labels' ? 'rgba(95, 85, 239, 0.75)' : 'rgba(95, 85, 239, 0.08)'};
  color: ${(props) => (props.jira ? '#fff' : '#000')};
  font-weight: ${(props) => (props.jira ? '600' : '#400')};
`;

const MainHeading = ({ title,toggle }) => {
  const dispatch = useDispatch();

  // Selectors
  const display = useSelector((state) => state.toggle);

  const defaultTitle = display.ado ? 'ADO Projects' : 'Jira Labels';

  const toggleAdoHandler = () => {
    dispatch(toggleAdo());
  };

  const toggleJiraHandler = () => {
    dispatch(toggleJira());
  };

  return (
    <Stack direction="row" alignItems="center" justify={"space-between"} mt="6">
      <h1 className='text-primary'>{title ? title : defaultTitle}</h1>
      <Toggle>
          <AdoToggle
            className='ado'
            ado={title}
            onClick={toggle}
          >
            ADO
          </AdoToggle>
          <JiraToggle
            className='jira'
            onClick={toggle}
            jira={title}
          >
            JIRA
          </JiraToggle>
      </Toggle>
    </Stack>
  );
};

export default MainHeading;
