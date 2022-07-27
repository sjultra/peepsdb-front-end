import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../contextStore';
import Axios from '../utils/axios';

const useLogin = ()=>{


    const [{auth},setAppState] = useContext(AppContext);
    
    const hrefSplit = window.location.href.split('?token=');

    const query = hrefSplit[1];

    const browserToken = auth?.token? auth?.token :JSON.parse(localStorage.getItem('peepsdb-auth'))?.token;

    
    const tokenRef = useRef({
        type:browserToken?'':query?'sign':'',
        token:browserToken || query
    })

    console.log('browserToken',auth,JSON.parse(localStorage.getItem('peepsdb-auth')))

    const setAppStateRef = useRef(setAppState)

    useEffect(()=>{

        (async()=>{
            console.log('tokenRef',tokenRef.current)
            if(tokenRef.current.token){

                try{
                    let req = await Axios.get(`/auth${tokenRef.current.type?'?sign=yes':''}`,{
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `${tokenRef.current.token}`,    
                        }
                    });

                    const {status,data} = req;

                    console.log('user status',status)
                    if(status===200){

                        setAppStateRef.current(prev=>{
                            console.log('app state is being reset')
                            return({
                                ...prev,
                                auth:{
                                    ...data,
                                    token:tokenRef.current.token,
                                    isAuthenticated:true,
                                }
                        
                            })
                        });

                        data.token && localStorage.setItem('peepsdb-auth',JSON.stringify(data));
    
                    }


                }
                catch(err){
                    console.log('err at login',err?.response)
                }
            }
            
        })()
    },[])


}


export default useLogin