import { authActions, selectAuth } from "../store/reducers/auth";
import  {useDispatch,useSelector} from 'react-redux'
import { useCallback } from "react";
import Axios from '../utils/axios'
import useWidget from "./useWidget";
import { capitalizeString } from "../utils/helpers";

const useAuthActions = ()=>{


    const {setAuth:set,setProfile:setP} = authActions;

    const {setLoading} = useWidget()

    const dispatch = useDispatch();

    const {auth,profile} = useSelector(selectAuth)


    //store update actions

    const setAuth = useCallback((payload)=>dispatch(set(payload)),[dispatch,set]) 

    const setProfile= useCallback((payload)=>dispatch(setP(payload)),[dispatch,setP]) 

    const logout = ()=>{
        localStorage.removeItem('peepsdb-auth');
        setAuth({});
    }


    //endpoints
    
    const updateUser  = async(payload)=>{
        try{
            let req = await Axios[profile?.isOnboarded?'put':'post']('/profiles',payload);

            let {data,status} = req;
            
            return {
                data:data,
                status
            }


        }
        catch(err){
            return {
                error:err
            }
        }
    }
    
    const fetchMyProfile =async()=>{

        try{
            setLoading(true)
          let req = await Axios.get('/profiles/me');
            
          let {data} = req


          req.status===201 && setProfile({
            ...data,
            firstName:capitalizeString(data?.firstName),
            lastName:capitalizeString(data?.lastName)
          })


        }
        catch(err){
          console.error('err at fectching my profile',err)
        }
        finally{
            setLoading(false)
        }
    }

  
    
  
    return {
        logout,
        setAuth,
        setProfile,
        auth,
        profile,
        updateUser,
        fetchMyProfile
    }

}

export default useAuthActions;