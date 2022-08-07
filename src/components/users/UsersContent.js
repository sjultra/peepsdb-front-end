import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { capitalizeString } from '../../utils/helpers';

const Item = styled.ul`
  display: grid;
  grid-template-columns: 0.26fr 0.34fr 0.2fr 0.2fr;
  grid-column-gap: 3rem;
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

const Status = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StatusIndicator = styled.span`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-right: 0.6rem;
  background: ${(props) => (props.role === 'Guest' ? '#7f7f7f' : '#5e55ef')};
`;

const UsersContent = ({ profiles, filterText }) => {
  const filterUsers = (item) => {
    return (
      item?.firstName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.googleGmailId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.role.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <div>
      {profiles?.length &&
        profiles.filter(filterUsers).map((profile, index) => {
          const { _id:user, firstName:firstname, lastName:lastname, googleGmailId, role } = profile;

          const fName = capitalizeString(firstname);
          const lName = capitalizeString(lastname);
          console.log('user id',user)
          return (
            <Link key={index} to={`/admin/users/${user}`}>
              <Item>
                <li>
                  {fName} {lName}
                </li>
                <li>{googleGmailId}</li>
                <li>{role}</li>
                <Status>
                  <StatusIndicator role={role}></StatusIndicator>
                  <span>{role === 'Guest' ? 'Pending' : 'Active'}</span>
                </Status>
              </Item>
            </Link>
          );
        })}
      {profiles === [] && <h3>No user</h3>}
    </div>
  );
};

export default UsersContent;
