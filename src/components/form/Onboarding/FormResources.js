import styled from 'styled-components';

// To be reviewed

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 2rem 0 1rem 0;
    color: rgba(4, 9, 33, 0.76);
    font-size: 15px;
  }

  span {
    color: #ff0000;
  }

  input,
  select {
    height: 50px;
    border: 2px solid #f1f1f1;
    padding: 0 2rem;
    background: rgba(4, 9, 33, 0.04);

    border: 1.36937px solid rgba(4, 9, 33, 0.04);
    border-radius: 12px;

    &:focus {
      outline: 0;
      border: 2px solid #5e55ef;
    }
  }

  select {
    background: #fff;
  }
`;
