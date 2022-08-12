import React from 'react';
import styled from 'styled-components';
import { capitalizeString } from '../../utils/helpers';

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

const UserContent = ({ user }) => {
  const firstname = capitalizeString(user?.firstName)

  const lastname = capitalizeString(user?.lastName)

  const {
    profile,
    onboard,
  } = user;


  const {
    ndaSent:mutualNdaSent,
    ndaSigned:mutualNdaSigned,
    emailSetup,
    sendReceiveEmail,
    msTeamsSetup,
  } = onboard;

  const {role} = profile

  return (
    <>
      {user && (
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
            <div>{String(mutualNdaSent)}</div>
          </div>
          <div>
            <div>Mutual NDA signed</div>
            <div>{String(mutualNdaSigned)}</div>
          </div>
          <div>
            <div>Email setup</div>
            <div>{String(emailSetup)}</div>
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
