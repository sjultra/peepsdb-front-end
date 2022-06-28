import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ADOProjects from '../ado/ADOProjects';
import JiraLabels from '../jira/JiraLabels';
import MainHeading from '../layouts/MainHeading';

const Wrapper = styled.div`
  padding: 0 2rem;

  @media (max-width: 1000px) {
    padding: 0 1rem;
  }

  @media (max-width: 900px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 900px) {
    padding: 0 0;
  }
`;

const MembersDashboard = () => {
  const display = useSelector((state) => state.toggle);

  return (
    <Wrapper>
      <MainHeading />
      {display.ado ? <ADOProjects /> : <JiraLabels />}
    </Wrapper>
  );
};

export default MembersDashboard;
