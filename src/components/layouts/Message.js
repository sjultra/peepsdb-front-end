import { Box } from '@chakra-ui/react';

// To be reviewed; Code commented in case styling needs to be used in the near future
// Styling for FormWrapper

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

// Moved here since it is only related to this file. Come back when message is reviewed and change wrapper to Chakra-UI

// export const Wrapper = styled.div`
//   margin: 0 40rem;

//   @media (max-width: 1700px) {
//     margin: 0 35rem;
//   }

//   @media (max-width: 1500px) {
//     margin: 0 30rem;
//   }

//   @media (max-width: 1200px) {
//     margin: 0 25rem;
//   }

//   @media (max-width: 1080px) {
//     margin: 0 20rem;
//   }

//   @media (max-width: 900px) {
//     margin: 0 15rem;
//   }

//   @media (max-width: 768px) {
//     margin: 0 10rem;
//   }

//   @media (max-width: 660px) {
//     margin: 0 8rem;
//   }

//   @media (max-width: 550px) {
//     margin: 0 5rem;
//   }

//   @media (max-width: 450px) {
//     margin: 0 2rem;
//   }

//   @media (max-width: 320px) {
//     margin: 0 1rem;
//   }
// `;

const Message = ({ msg, variant }) => {
  return (
    // <FormWrapper>
    <Box variant={variant}>{msg}</Box>
    // </FormWrapper>
  );
};

export default Message;
