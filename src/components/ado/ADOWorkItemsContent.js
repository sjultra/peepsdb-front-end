import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { filteredWorkItems } from '../../actions/adoActions';

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
  background: ${({ state }) => {
    if (state === 'To Do' || state === 'New') {
      return '#b2b2b2';
    } else if (state === 'Active' || state === 'Doing') {
      return '#5e55ef';
    } else if (state === 'Resolved') {
      return '#ff9d00';
    } else {
      return '#007acc';
    }
  }};
`;

const ADOWorkItemsContent = ({ projectWorkItems }) => {
  // Selector
  const filters = useSelector((state) => state.adoFilter);

  return (
    <div>
      {projectWorkItems && (
        <div>
          {filteredWorkItems(projectWorkItems, filters)
            .sort((a, b) => {
              return a.fields.changedDate < b.fields.changedDate
                ? 1
                : a.fields.changedDate > b.fields.changedDate
                ? -1
                : 0;
            })
            .map((item, index) => {
              const { fields } = item;
              return (
                <Item key={index}>
                  <div>{fields.id}</div>
                  <div>{fields.title}</div>
                  <AssignedTo>
                    <img
                      src={
                        fields.assignedTo.imageUrl
                          ? fields.assignedTo.imageUrl
                          : 'https://cdn.vsassets.io/ext/ms.vss-work-web/wit-ui-identity/Content/notassigned-user.T_2eoRxWQUV1XYFn.svg'
                      }
                      alt=''
                    />
                    <div>
                      {fields.assignedTo.displayName
                        ? fields.assignedTo.displayName
                        : 'Unassigned'}
                    </div>
                  </AssignedTo>
                  <StateValue>
                    <StateIndicator
                      state={fields.state}
                    ></StateIndicator>
                    <span>{fields.state}</span>
                  </StateValue>
                </Item>
              );
            })}
        </div>
      )}

      {!projectWorkItems.length && <h3>No work Items</h3>}
    </div>
  );
};

export default ADOWorkItemsContent;
