import axios from 'axios';
import { deviceDetect, isMobile } from 'react-device-detect';
// import useDeviceMetaData from "./useDeviceInfo";

const useAxios = () => {
  const device = deviceDetect();

  const localStorageToken =
    localStorage.getItem('peepsdb-auth') || JSON.stringify({});

  const token = JSON.parse(localStorageToken)?.token;

  const deviceinfo = JSON.stringify({ device });

  const baseUrl = process.env['REACT_APP_BACKEND_URL'];

  const Axios = token
    ? axios.create({
        baseURL: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          deviceinfo,
        },
      })
    : axios.create({
        baseURL: baseUrl,
        headers: {
          'Content-Type': 'application/json',
          deviceinfo,
        },
      });

  return Axios;
};

export default useAxios;
