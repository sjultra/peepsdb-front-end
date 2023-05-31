import { useEffect, useRef } from 'react';
import useAxios from './useAxios';
import { capitalizeString } from '../utils/helpers';
import useAuthActions from './useAuth';
import useAppInsights from './useAppInsights';
import jwt from 'jwt-decode'

const useLogin = () => {

    const {setAuth,auth,fetchMyProfile} = useAuthActions()

    const {userTimezone,device,geoLocation} = useAppInsights()


    const deviceinfo = JSON.stringify({
        geoLocation,
        userTimezone,
        device
    });
  
    const axios  = useAxios();

    const windowQueries = window.location.search;
    
    const urlSearch = new URLSearchParams(windowQueries)
    
    const queries = Object.fromEntries(urlSearch.entries())  || {};

  console.log('queries', queries);

  const browserToken = auth?.token
    ? auth?.token
    : JSON.parse(localStorage.getItem('peepsdb-auth'))?.token;

    const tokenRef = useRef({
        type:queries?.token?'sign':'',
        token: queries?.token || browserToken
    })

  const setAuthRef = useRef(setAuth);

  const fetchMyProfileRef = useRef(fetchMyProfile);

    useEffect(()=>{
        if(tokenRef.current.token){
            let decodedJwt = jwt(tokenRef.current.token)
            console.log('jwt decoded',decodedJwt)
        }
    },[])

    useEffect(()=>{
        
        (async()=>{
            
            console.log('golocation in uselogin is',geoLocation);

            if(tokenRef.current.token && geoLocation){

                try{
                    let req = await axios.get(`/auth${tokenRef.current.type?'?sign=yes':''}`,{
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `${tokenRef.current.token}`, 
                            deviceinfo

                        }
                    });

                    const {status,data:dataPayload} = req;
                    
                    let data = {
                        ...dataPayload,
                        firstName:capitalizeString(dataPayload?.firstName || ''),
                        lastName:capitalizeString(dataPayload?.lastName || '')
                    }

                    if(status===200 || status===201){
                        setAuthRef.current({
                            ...data,
                            token:tokenRef.current.token,
                            isAuthenticated:true,                       
                        });

                        fetchMyProfileRef.current(tokenRef.current?.token);
                        
                        let firstLoginEntry = localStorage.getItem('firstLoginStamp');

                        !firstLoginEntry && localStorage.setItem('firstLoginStamp',true);

                        data.token && localStorage.setItem('peepsdb-auth',JSON.stringify(data));                     

                    }


                }
                catch(err){
                    console.log('err at login',err?.response,err)
                    setAuthRef.current({
                        isAuthenticated:false,                        
                    })


                }
            }
            
        })()
    },[geoLocation])


};

export default useLogin;
