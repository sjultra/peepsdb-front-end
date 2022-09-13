import React, {  } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Background from '../assets/images/login-background.png';
import Google from '../assets/images/google-icon.png';
import Github from '../assets/images/github-icon.png';
import Microsoft from '../assets/images/microsoft-icon.png';
import { backendURL, githubClientID } from '../utils/setEnv';
import useAuthActions from '../hooks/useAuth';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 90vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }

  img {
    @media (max-width: 1400px) {
      width: 51.5rem;
      height: 55rem;
    }

    @media (max-width: 1300px) {
      width: 46.5rem;
      height: 50rem;
    }

    @media (max-width: 1200px) {
      width: 41.5rem;
      height: 45rem;
    }

    @media (max-width: 1000px) {
      width: 36.5rem;
      height: 40rem;
    }
  }
`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 3rem;
    font-size: 3rem;

    @media (max-width: 550px) {
      font-size: 2.5rem;
    }
  }
`;

const Socials = styled.a`
  height: 6rem;
  width: 35rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem 0 4.5rem;
  border-radius: 5rem;
  box-shadow: 0 1px 5px #cccccc;
  margin: 3rem 0;
  font-size: 1.7rem;
  cursor: pointer;

  @media (max-width: 550px) {
    height: 6rem;
    width: 33rem;
    padding: 0 4.5rem 0 4rem;
  }

  @media (max-width: 450px) {
    height: 5.5rem;
    width: 30rem;
    padding: 0 3.2rem 0 2.7rem;
  }

  @media (max-width: 350px) {
    height: 5.5rem;
    width: 28rem;
    padding: 0 2.8rem 0 2.3rem;
  }

  &:hover {
    background: #f9f9f9;
  }
`;

const LoginScreen = () => {
  // Selector

  const {auth} = useAuthActions();



  // Redirect if logged in
  if (auth?.token) {
    console.log('redirecting after login')
    return <Redirect to='/' />;
  }

  const backendUrl = backendURL;


  // console.log('envs',backendURL+'/'+process.env.REACT_APP_GITHUB_CALLBACK_URL,)


  return (
    <Wrapper>
      <ItemLeft>
        <img src={Background} alt='' />
      </ItemLeft>
      <ItemRight>
        <h2>Welcome to PeepsDB</h2>
        <Socials href={`${backendUrl}/auth/google`}>
          <img src={Google} alt='' />
          <p>Log in with Google</p>
        </Socials>
        <Socials
         href={`https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${encodeURIComponent(backendURL+'/'+process.env.REACT_APP_GITHUB_CALLBACK_URL)}?path=/&scope=user:email`}>
          <img src={Github} alt='' />
          <p>Log in with Github</p>
        </Socials>
        <Socials href={`${backendUrl}/auth/microsoft`}>
          <img src={Microsoft} alt='' />
          <p>Log in with Microsoft</p>
        </Socials>
      </ItemRight>
    </Wrapper>
  );
};

export default LoginScreen;
