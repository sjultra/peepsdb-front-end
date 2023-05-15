import { Wrapper as FormWrapper } from '../form/Onboarding/FormResources';
import { Box } from '@chakra-ui/react';

// To be reviewed; Code commented in case styling needs to be used in the near future

// const Wrapper = styled.div`
//   // padding: 1rem 2rem;
//   // height: fit-content;
//   // margin: 2rem 0 1.5rem 0;
//   // border-radius: 0.3rem;
//   background: ${({ variant }) => {
//     if (variant === 'error') {
//       return '#F7DDDC';
//     } else if (variant === 'success') {
//       return '#d1e7dd';
//     } else {
//       return '#D3D3D4';
//     }
//   }};
//   color: ${({ variant }) => {
//     if (variant === 'error') {
//       return '#712B29';
//     } else if (variant === 'success') {
//       return '#0F5132';
//     } else {
//       return '#141619';
//     }
//   }};
// `;

const Message = ({ msg, variant }) => {
  return (
    <FormWrapper>
      <Box variant={variant}>{msg}</Box>
    </FormWrapper>
  );
};

export default Message;
