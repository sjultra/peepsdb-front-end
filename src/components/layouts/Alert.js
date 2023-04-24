import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Wrapper } from '../form/FormResources';

const AlertBg = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.3rem;
  background: ${(props) =>
    props.alertType === 'error' ? '#F7DDDC' : '#d1e7dd'};
  color: ${(props) => (props.alertType === 'error' ? '#712B29' : '#0F5132')};
`;

const Alert = () => {
  // Selectors
  const alert = useSelector((state) => state.alert);

  if (alert !== null) {
    return (
      <Wrapper>
        <p>Get fucked</p>
        {/* <AlertBg alertType={alert.alertType}>{alert.msg}</AlertBg> */}
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

export default Alert;

// import { Box } from '@chakra-ui/react';

// const AlertBg = ({ alertType, children, ...props }) => {
//   const backgroundColor = alertType === 'error' ? '#F7DDDC' : '#d1e7dd';
//   const textColor = alertType === 'error' ? '#712B29' : '#0F5132';

//   return (
//     <Box
//       padding="1rem 2rem"
//       borderRadius="0.3rem"
//       background={backgroundColor}
//       color={textColor}
//       {...props}
//     >
//       {children}
//     </Box>
//   );
// };
