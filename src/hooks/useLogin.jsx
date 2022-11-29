import {  useEffect, useRef } from 'react';
import Axios from '../utils/axios';
import { capitalizeString } from '../utils/helpers';
import useAuthActions from './useAuth';

const useLogin = ()=>{

    const {setAuth,auth,fetchMyProfile} = useAuthActions()
    
    // const hrefSplit = window.location.href.split('?token=');


    const windowQueries = window.location.search;
    const urlSearch = new URLSearchParams(windowQueries)
    const queries = Object.fromEntries(urlSearch.entries())  || {};

    console.log('queries',queries)

    const browserToken = auth?.token? auth?.token :JSON.parse(localStorage.getItem('peepsdb-auth'))?.token;

    

    const tokenRef = useRef({
        type:queries?.token?'sign':'',
        token: queries?.token || browserToken
    })

    // console.log('browserToken',auth)

    const setAuthRef = useRef(setAuth);

    const fetchMyProfileRef = useRef(fetchMyProfile);


    useEffect(()=>{
        

        (async()=>{
            
            console.log('text is')

            if(tokenRef.current.token){

                try{
                    let req = await Axios.get(`/auth${tokenRef.current.type?'?sign=yes':''}`,{
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `${tokenRef.current.token}`,    
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
    },[])


}


export default useLogin