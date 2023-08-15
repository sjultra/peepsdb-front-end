import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 40rem;

  @media (max-width: 1700px) {
    margin: 0 35rem;
  }

  @media (max-width: 1500px) {
    margin: 0 30rem;
  }

  @media (max-width: 1200px) {
    margin: 0 25rem;
  }

  @media (max-width: 1080px) {
    margin: 0 20rem;
  }

  @media (max-width: 900px) {
    margin: 0 15rem;
  }

  @media (max-width: 768px) {
    margin: 0 10rem;
  }

  @media (max-width: 660px) {
    margin: 0 8rem;
  }

  @media (max-width: 550px) {
    margin: 0 5rem;
  }

  @media (max-width: 450px) {
    margin: 0 2rem;
  }

  @media (max-width: 320px) {
    margin: 0 1rem;
  }
`;

export const DetailsWrapper = styled.div`
  margin: 0 30rem;

  @media (max-width: 1700px) {
    margin: 0 25rem;
  }

  @media (max-width: 1500px) {
    margin: 0 15rem;
  }

  @media (max-width: 1200px) {
    margin: 0 10rem;
  }

  @media (max-width: 1080px) {
    margin: 0 5rem;
  }

  @media (max-width: 900px) {
    margin: 0 5rem;
  }

  @media (max-width: 868px) {
    margin: 0 2rem;
  }

  @media (max-width: 660px) {
    margin: 0 0rem;
  }
`;

export const PrimaryHeading = styled.h1`
  margin: 2rem 0;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 2rem 0 1rem 0;
  }

  span {
    color: #ff0000;
  }

  input,
  select {
    height: 50px;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
    padding: 0 2rem;

    &:focus {
      outline: 0;
      border: 2px solid #5e55ef;
    }
  }

  select {
    background: #fff;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;
  font-size: 1.6rem;
`;

export const BtnPrev = styled.button`
  height: 5rem;
  width: 20rem;
  background: #fff;
  color: #000;
  border: 1px solid #5e55ef;
  border-radius: 10px;
  transition: all 0.3s;

  @media (max-width: 900px) {
    width: 15rem;
  }

  @media (max-width: 550px) {
    width: 12rem;
  }

  @media (max-width: 375px) {
    width: 11rem;
  }

  &:hover {
    background: #5e55ef;
    color: #fff;
  }
`;

export const BtnNext = styled.button`
  height: 5rem;
  width: 20rem;
  background: #5e55ef;
  border: 1px solid #5e55ef;
  color: #fff;
  border-radius: 10px;
  transition: all 0.3s;

  @media (max-width: 900px) {
    width: 15rem;
  }

  @media (max-width: 550px) {
    width: 12rem;
  }

  @media (max-width: 375px) {
    width: 11rem;
  }

  &:hover {
    background: #fff;
    color: #000;
  }
`;
