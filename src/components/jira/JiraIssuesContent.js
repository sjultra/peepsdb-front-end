import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { filteredLabelIssues } from '../../actions/jiraActions';

const Item = styled.div`
  display: grid;
  grid-template-columns: 0.07fr 0.58fr 0.2fr 0.15fr;
  grid-column-gap: 2rem;
  padding: 1.2rem 1rem 1.2rem 3rem;
  border-bottom: 1px solid #f1f1f1;
  min-width: 120rem;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const AssignedTo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 2rem;
    border-radius: 50%;
    margin-right: 0.7rem;
  }
`;

const StateValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span:first-child {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    margin-right: 0.6rem;
  }
`;

const StateIndicator = styled.span`
  background: ${({ status }) => {
    if (status === 'To Do') {
      return '#b2b2b2';
    } else if (status === 'In Progress') {
      return '#5e55ef';
    } else if (status === 'Done') {
      return '#ff9d00';
    } else {
      return '#007acc';
    }
  }};
`;

const JiraIssuesContent = ({ issues }) => {
  // Selectors
  const filters = useSelector((state) => state.jiraFilter);

  const unassigned = {
    fontSize: '2rem',
    marginRight: '0.7rem',
  };

  return (
    <div>
      {issues &&
        filteredLabelIssues(issues, filters)
          .sort((a, b) => {
            return a.fields.updated < b.fields.updated
              ? 1
              : a.fields.updated > b.fields.updated
              ? -1
              : 0;
          })
          .map((issue, index) => {
            return (
              <Item key={index}>
                <div>{issue.key.split('-')[1]}</div>
                <div>{issue.fields.summary}</div>
                <AssignedTo>
                  {issue.fields.assignee.avatarUrl !== null && (
                    <img src={issue.fields.assignee.avatarUrl} alt="" />
                  )}
                  {issue.fields.assignee.avatarUrl === null && (
                    <FaUserCircle style={unassigned} />
                  )}
                  <div>
                    {issue.fields.assignee.displayName !== null
                      ? issue.fields.assignee.displayName
                      : 'Unassigned'}
                  </div>
                </AssignedTo>
                <StateValue>
                  <StateIndicator status={issue.fields.status}></StateIndicator>
                  <span>{issue.fields.status}</span>
                </StateValue>
              </Item>
            );
          })}
      {issues === [] && <h3>No issues</h3>}
    </div>
  );
};

export default JiraIssuesContent;
