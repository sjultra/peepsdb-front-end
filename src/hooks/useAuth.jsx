import { authActions, selectAuth } from "../store/reducers/auth";
import  {useDispatch,useSelector} from 'react-redux'
import { useCallback, useState } from "react";
import { capitalizeString } from "../utils/helpers";
import useAxios from "./useAxios";

const useAuthActions = ()=>{


    const {setAuth:set,setProfile:setP} = authActions;


    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch();


    const {auth,profile} = useSelector(selectAuth)

    const Axios = useAxios()

    //store update actions

    const setAuth = useCallback((payload)=>dispatch(set(payload)),[dispatch,set]) 

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
        let req = await Axios[profile?.profileSetup?'put':'post']('/profiles',payload);

        let {data,status} = req;

        console.log('updating user',data)
        
        return {
            data:data,
            status
        }


    }
    
    const fetchMyProfile = async(token)=>{

        try{

          setLoading(true)
          let req = await Axios.get('/profiles/me',{
            ...token?{
                headers:{'Authorization':token}
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
        auth,
        profile,
        updateUser,
        fetchMyProfile,
        setLoading,
        loading,
    }

}

export default useAuthActions;