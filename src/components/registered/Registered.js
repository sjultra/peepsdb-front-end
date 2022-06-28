import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
  const user = useSelector((state) => state.userInfo.user);

  const { name } = user;

  const nameArray = name.split(' ');
  const firstname = nameArray[0][0].toUpperCase() + nameArray[0].slice(1);
  const lastname = nameArray[1][0].toUpperCase() + nameArray[1].slice(1);

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
