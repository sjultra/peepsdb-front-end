import React, { useState } from 'react';
import styled from 'styled-components';
import ADOProjects from '../ado/ADOProjects';
import JiraLabels from '../jira/JiraLabels';
import MainHeading from '../layouts/MainHeading';
import NavLayout from '../layouts/NavLayout';



const TitleToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;

  h1 {
    margin-right: 3rem;

    @media (max-width: 450px) {
      margin-right: 2rem;
    }

    @media (max-width: 1000px) {
      font-size: 3rem;
    }

    @media (max-width: 800px) {
      font-size: 2.9rem;
    }

    @media (max-width: 600px) {
      font-size: 2.8rem;
    }

    @media (max-width: 500px) {
      font-size: 2.6rem;
    }

    @media (max-width: 450px) {
      font-size: 2.5rem;
    }

    @media (max-width: 400px) {
      font-size: 2.4rem;
    }
  }
`;

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
    props.ado ? 'rgba(95, 85, 239, 0.75)' : 'rgba(95, 85, 239, 0.08)'};
  color: ${(props) => (props.ado ? '#fff' : '#000')};
  font-weight: ${(props) => (props.ado ? '600' : '#400')};
`;

const JiraToggle = styled.div`
  background: ${(props) =>
    props.jira ? 'rgba(95, 85, 239, 0.75)' : 'rgba(95, 85, 239, 0.08)'};
  color: ${(props) => (props.jira ? '#fff' : '#000')};
  font-weight: ${(props) => (props.jira ? '600' : '#400')};
`;





const UserWorkspace = () => {

  // const display = useSelector((state) => state.toggle);

  const [activeScreen,setactiveScreen] = useState('ado');

  const title = activeScreen==='ado' ? 'ADO Projects' : 'Jira Labels';

  const toggle = ()=>setactiveScreen(prev=>prev==='ado'?'jira':'ado')
  
  return (
    <>
      <MainHeading  title={title} {...{toggle}} />
      {activeScreen==='ado' ? <ADOProjects   /> : <JiraLabels />}
    </>
  );
};

export default UserWorkspace;
