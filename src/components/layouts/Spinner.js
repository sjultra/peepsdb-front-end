import React from 'react';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #5e55ef;
`;

const Spinner = () => {
  return (
    <div className='sweet-loading'>
      <BeatLoader color={'#5e55ef'} loading={true} css={override} size={10} />
    </div>
  );
};

export default Spinner;
