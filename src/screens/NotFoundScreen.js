import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem;

  h3 {
    > *:hover {
      color: #575555;
      transition: color 0.2s;
    }
  }
`;

const NotFoundScreen = () => {
  return (
    <Wrapper>
      <h1>
        <span className='text-primary'>Page </span>Not Found
      </h1>
      <h3>
        <Link to='/'>Click to return to home</Link>
      </h3>
    </Wrapper>
  );
};

export default NotFoundScreen;
