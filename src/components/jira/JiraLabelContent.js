import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6rem;

  @media (max-width: 1400px) {
    grid-gap: 4rem;
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-gap: 3rem;
  }

  @media (max-width: 900px) {
    grid-gap: 2rem;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
  }

  @media (max-width: 600px) {
    grid-gap: 2rem;
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Issue = styled.div`
  background: rgba(95, 85, 239, 0.07);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 3px #e8e8e8;
  cursor: pointer;
`;

const ProjectName = styled.div`
  font-size: 2.8rem;
  font-weight: 500;

  @media (max-width: 1000px) {
    font-size: 2.6rem;
  }

  @media (max-width: 600px) {
    font-size: 2.3rem;
  }
`;

const IssuesCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4rem;

  div:first-child {
    background: #fff;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    font-size: 2.1rem;
    font-weight: 600;

    @media (max-width: 600px) {
      font-size: 1.9rem;
    }

    @media (max-width: 450px) {
      width: 5rem;
      height: 5rem;
    }
  }

  div:last-child {
    font-size: 2.1rem;
    font-weight: 400;

    @media (max-width: 600px) {
      font-size: 1.9rem;
    }
  }
`;

const JiraLabelContent = ({ labels, search, loading, issues, total }) => {
  if (!loading && labels) {
    return (
      <Wrapper>
        {labels &&
          labels
            .filter((label) =>
              label.toLowerCase().includes(search.toLowerCase())
            )
            .map((label, index) => {
              return (
                <Link to={`/jira_issues/${label}`} key={index}>
                  <Issue>
                    <ProjectName>{label}</ProjectName>
                    <IssuesCount>
                      <div>
                        {issues && issues.length === total
                          ? issues.filter((issue) =>
                              issue.labels.includes(label)
                            ).length
                          : '-'}
                      </div>
                      <div>Issues</div>
                    </IssuesCount>
                  </Issue>
                </Link>
              );
            })}
      </Wrapper>
    );
  } else {
    return <Spinner />;
  }
};

export default JiraLabelContent;
