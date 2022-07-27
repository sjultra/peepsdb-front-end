import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import { AppContext } from '../../contextStore';

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
  const [{auth}] = useContext(AppContext)
  const {isAuthenticated} = auth || {};

  return (
    <Wrapper>
      <h1>
        <Link to='/'>PeepsDB</Link>
      </h1>
      {isAuthenticated && auth && <UserDropdown user={auth} />}
    </Wrapper>
  );
};

export default Navbar;
