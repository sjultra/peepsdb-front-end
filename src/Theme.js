import { extendTheme } from '@chakra-ui/react';

import './index.css';

const Theme = extendTheme({
  colors: {
    primary: { 500: '#5e55ef' },
    white: { 500: '#fff' },
    dark: { 500: '#000' },
    hash: { 500: '#827777' },
    fadebg: { 500: '#FAFAFA' },
    borders: { 500: '#9C9696' },
  },
  fonts: {
    logo: "'Amita', cursive",
  },
});

export default Theme;
