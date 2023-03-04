import React from 'react';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #5e55ef;
`;

const Spinner = ({className,full}) => {
  return (
    <div className={className +` sweet-loading ${full && 'full'}`}>
      <BeatLoader color={'#5e55ef'} loading={true} css={override} size={10} />
    </div>
  );
};

export default styled(Spinner)`

  &.full{
    display:flex;
    justify-content:center;
    align-items: center;
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
  }



`;
