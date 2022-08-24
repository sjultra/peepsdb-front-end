import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAuthActions from '../../hooks/useAuth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const Content = styled.div`
  height: 100%;

  > div {
    font-size: 3rem;
    margin-top: 5rem;
    margin-bottom: 3rem;
    text-align: center;

    @media (max-width: 420px) {
      font-size: 2.5rem;
    }

    @media (max-width: 350px) {
      font-size: 2.2rem;
    }
  }

  > *:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
  }
`;

const Button = styled.div`
  padding: 1rem 3rem;
  background: #5e55ef;
  color: #fff;
  text-align: center;
  border-radius: 0.5rem;
  width: 20rem;

  transition: all 0.3s;

  &:hover {
    background: #5e55ef;
    opacity: 0.9;
  }
`;

const Registered = () => {
  // Selectors
  const  {profile} = useAuthActions();
  const { firstName:firstname,lastName:lastname } = profile;


  return (
    <Wrapper>
      <Content>
        <div>
          You have a profile {firstname} {lastname}
        </div>
        <Link to='/profile'>
          <Button>View profile</Button>
        </Link>
      </Content>
    </Wrapper>
  );
};

export default Registered;
