import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDropdown from './UserDropdown';

const Wrapper = styled.div`
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 3rem;
  }

  @media (max-width: 450px) {
    padding: 0 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }
`;

const Navbar = () => {
  // Selectors
  const user = useSelector((state) => state.userInfo.user);
  const isAuthenticated = useSelector(
    (state) => state.userLogin.isAuthenticated
  );

  return (
    <Wrapper>
      <h1>
        <Link to='/'>PeepsDB</Link>
      </h1>
      {isAuthenticated && user && <UserDropdown user={user} />}
    </Wrapper>
  );
};

export default Navbar;
