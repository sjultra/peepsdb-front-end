import { authActions, selectAuth } from "../store/reducers/auth";
import  {useDispatch,useSelector} from 'react-redux'
import { useCallback, useState } from "react";
import { capitalizeString } from "../utils/helpers";
import useAxios from "./useAxios";
import useDeviceInfo from "./useDeviceInfo";


const useAuthActions = ()=>{

    const {setAuth:set,setProfile:setP,closeWelcome:close} = authActions;

    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch();

    const {auth,profile,welcome} = useSelector(selectAuth)

    const {device} = useDeviceInfo()

    const Axios = useAxios()

    //store update actions

    const setAuth = useCallback((payload)=>dispatch(set(payload)),[dispatch,set]) 

    const closeWelcome = useCallback(()=>dispatch(close()),[dispatch,close]) 

    const setProfile= useCallback((payload)=>{
      console.log('setting profile',payload)
      dispatch(setP(payload))
    },[dispatch,setP]) 

    const logout = ()=>{
        localStorage.removeItem('peepsdb-auth');
        setAuth({});
    }
    //endpoints
    const updateUser  = async(payload)=>{


      console.log('profile payload',payload)

        let req = await Axios[profile?.profileSetup?'put':'post']('/profiles',payload);
        let {data,status} = req;
        return {
          data:data,
          status
        }

    }
    
    const fetchMyProfile = async(token)=>{
        const deviceinfo = JSON.stringify({device});

        try{

          setLoading(true)
          let req = await Axios.get('/profiles/me',{
            ...token?{
                headers:{
                  'Authorization':token,
                  deviceinfo
                  
                }
            }:{}
          });
            
          let {data} = req


          req.status===201 && setProfile({
            ...data,
            firstName:capitalizeString(data?.firstName),
            lastName:capitalizeString(data?.lastName)
          })


        }
        catch(err){
          console.error('err at fetching my profile',err)
        }
        finally{
            setLoading(false)
        }
    }
    

    return {
        logout,
        setAuth,
        setProfile,
        updateUser,
        fetchMyProfile,
        setLoading,
        closeWelcome,
        loading,
        auth,
        profile,
        welcome,
    }

}

export default useAuthActions;