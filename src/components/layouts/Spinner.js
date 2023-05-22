import React from 'react';

import { Flex } from '@chakra-ui/react';
import BeatLoader from 'react-spinners/BeatLoader';

const Spinner = ({ fontSize = 10 }) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <BeatLoader color={'#5e55ef'} loading={true} size={fontSize} />
    </Flex>
  );
};

export default Spinner;
