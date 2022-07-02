import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  min-width: 70rem;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }

  > div {
    display: grid;
    grid-template-columns: 0.8fr 0.2fr;
    padding: 1.2rem 1rem 1.2rem 3rem;
    border-bottom: 1px solid #f1f1f1;
  }
`;

const UserContent = ({ userStatus }) => {
  const firstname =
    userStatus &&
    userStatus.firstname[0].toUpperCase() + userStatus.firstname.slice(1);

  const lastname =
    userStatus &&
    userStatus.lastname[0].toUpperCase() + userStatus.lastname.slice(1);

  const {
    role,
    mutualNdaSent,
    mutualNdaSigned,
    emailSetup,
    sendReceiveEmail,
    msTeamsSetup,
  } = userStatus;

  return (
    <>
      {userStatus && (
        <Item>
          <div>
            <div>Name</div>
            <div>
              {firstname} {lastname}
            </div>
          </div>

          <div>
            <div>Role</div>
            <div>{role}</div>
          </div>

          <div>
            <div>Mutual NDA sent</div>
            <div>{mutualNdaSent}</div>
          </div>
          <div>
            <div>Mutual NDA signed</div>
            <div>{mutualNdaSigned}</div>
          </div>
          <div>
            <div>Email setup</div>
            <div>{emailSetup}</div>
          </div>
          <div>
            <div>Can send / receive email</div>
            <div>{sendReceiveEmail}</div>
          </div>
          <div>
            <div>MS Teams setup</div>
            <div>{msTeamsSetup}</div>
          </div>
        </Item>
      )}
    </>
  );
};

export default UserContent;
