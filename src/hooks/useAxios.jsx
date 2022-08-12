import axios from "axios";



const useAxios = ()=>{


    const localStorageToken = localStorage.getItem("peepsdb-auth") || JSON.stringify({})

    const token = JSON.parse(localStorageToken)?.token;


    const baseUrl = process.env[process.env['NODE_ENV']==='development'?'REACT_APP_BACKEND_TEST_URL':'REACT_APP_BACKEND_URL'] 

    const Axios = token
  ? axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
  : axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Axios

}


export default useAxios;
