import axios from "axios";
import useAppInsights from "./useAppInsights";
// import useDeviceMetaData from "./useDeviceInfo";



const useAxios = ()=>{

    
    const localStorageToken = localStorage.getItem("peepsdb-auth") || JSON.stringify({})

    const {device,userTimezone} = useAppInsights()
 
    const token = JSON.parse(localStorageToken)?.token;

    const deviceinfo = JSON.stringify({
      device,
      userTimezone
    });

 
    const baseUrl = process.env['REACT_APP_BACKEND_URL'];

    const Axios =
    token
    ? axios.create({
        baseURL: baseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
          deviceinfo

        },
      })
    : axios.create({
        baseURL: baseUrl,
        headers: {
          "Content-Type": "application/json",
        }
      });




    
 

    return Axios
    
}


export default useAxios;
