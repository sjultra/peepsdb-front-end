import axios from 'axios';

const tokenStr = localStorage.getItem('peepsdb-auth');

let token = tokenStr ? JSON.parse(tokenStr).token : undefined;

const baseUrl =
  process.env[
    process.env['NODE_ENV'] === 'development'
      ? 'REACT_APP_BACKEND_TEST_URL'
      : 'REACT_APP_BACKEND_URL'
  ];

const Axios = token
  ? axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
  : axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        notoken: `${tokenStr}`,
      },
    });

export default Axios;
