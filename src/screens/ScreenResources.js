import styled from "styled-components";

export const PrimaryHeading = styled.h1`
  margin: 2rem 0;

  @media (max-width: 1000px) {
    font-size: 3rem;
  }

  @media (max-width: 800px) {
    font-size: 2.9rem;
  }

  @media (max-width: 600px) {
    font-size: 2.8rem;
  }

  @media (max-width: 500px) {
    font-size: 2.6rem;
  }

  @media (max-width: 450px) {
    font-size: 2.5rem;
  }

  @media (max-width: 400px) {
    font-size: 2.4rem;
  }
`;

export const ContentWrapper = styled.div`
overflow-x: auto;
-ms-overflow-style: none; /* IE 11 */
scrollbar-width: none; /* Firefox 64 */

&::-webkit-scrollbar {
  width: 0;
}
`;

export const TitleFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Filter = styled.div`
  background: #f8f7ff;
  padding: 0.7rem 1.5rem;
  border-radius: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20rem;

  > *:first-child {
    color: #444;
  }

  input {
    background: #f8f7ff;
    padding: 0.4rem 0.8rem;
    border: 0;
    outline: 0;
    color: #333;
    width: 100%;
  }
`;