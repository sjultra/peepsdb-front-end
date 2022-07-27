import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthActions from '../../hooks/useAuthActions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DropDownWrapper = styled.div`
  position: absolute;
  top: 6.3rem;
  z-index: 2;
`;

const Callout = styled.div`
  margin-left: 32.8rem;
  width: 0;
  height: 0;
  border-left: 6.5px solid transparent;
  border-right: 6.5px solid transparent;
  border-bottom: 7.5px solid #d3d0fb;

  @media (max-width: 768px) {
    margin-left: 27.8rem;
  }

  @media (max-width: 350px) {
    margin-left: 28rem;
  }

  @media (max-width: 330px) {
    margin-left: 27rem;
  }
`;

const DropDown = styled.div`
  background: #d3d0fb;
  min-width: 35rem;
  padding: 2rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px #ddd;

  @media (max-width: 768px) {
    min-width: 30rem;
  }

  @media (max-width: 450px) {
    font-size: 1.4rem;
  }

  @media (max-width: 330px) {
    min-width: 29rem;
  }
`;

const Name = styled.div`
  display: flex;

  h4 {
    margin-right: 1rem;
  }
`;

const SignOut = styled.p`
  font-weight: 500;
  cursor: pointer;
`;

const Margin = styled.div`
  height: 0.1rem;
  background: #e9e9e9;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const UserDropdown = ({ user }) => {

  const [openDropdown, setOpenDropdown] = useState(false);

  const { username,firstName:firstname,lastName:lastname ,email, role } = user;


  const {logout} = useAuthActions()

  const onToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const style = {
    color: '#000',
    fontSize: '3.2rem',
    cursor: 'pointer',
    border: '2px solid #d3d0fb',
    borderRadius: '50%',
  };

  const displayName =  username? username: (firstname && lastname)? <> {firstname} {lastname} </>: 'user'

  return (
    <Wrapper>
      {user && <FaUserCircle style={style} onClick={onToggleDropdown} />}
      {openDropdown && (
        <DropDownWrapper>
          <Callout />
          <DropDown>
            <Link to='/profile'>
              <Name onClick={() => setOpenDropdown(false)}>
                <h4> {displayName} </h4>
                <p>({role})</p>
              </Name>
            </Link>
            <p style={{ margin: '1rem 0' }}>{email}</p>
            <Margin></Margin>
            <Link to='/meeting'>
              <p
                style={{ margin: '1rem 0' }}
                onClick={() => setOpenDropdown(false)}
              >
                Meeting
              </p>
            </Link>

            {role === 'Admin' && (
              <Link to='/admin/users'>
                <p
                  style={{ margin: '1rem 0' }}
                  onClick={() => setOpenDropdown(false)}
                >
                  Admin
                </p>
              </Link>
            )}

            <SignOut onClick={logout}>Sign Out</SignOut>
          </DropDown>
        </DropDownWrapper>
      )}
    </Wrapper>
  );
};

export default UserDropdown;
