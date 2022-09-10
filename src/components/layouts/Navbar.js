import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import useAuthActions from '../../hooks/useAuth';


const Navbar = ({boxShadow,className}) => {
  // Selectors
  const {auth} = useAuthActions()
  const {isAuthenticated} = auth || {};

  return (
    <div className={className}>
      <h1>
        <Link to='/'>PeepsDB</Link>
      </h1>
      {isAuthenticated && auth && <UserDropdown user={auth} />}
    </div>
  );
};

export default styled(Navbar)`

  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 5rem;
  ${props=>props.boxShadow?`box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.03);`:''}
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
