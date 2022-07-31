import { authActions, selectAuth } from "../store/reducers/auth";
import  {useDispatch,useSelector} from 'react-redux'
import { useCallback } from "react";


const useAuthActions = ()=>{


    const {setAuth:set,setProfile:setP} = authActions;

    const dispatch = useDispatch();


    const setAuth = useCallback((payload)=>dispatch(set(payload)),[dispatch,set]) 

    const setProfile= useCallback((payload)=>dispatch(setP(payload)),[dispatch,setP]) 

    const {auth,profile} = useSelector(selectAuth)

    const logout = ()=>{
        localStorage.removeItem('peepsdb-auth');
        setAuth({});
    }



    return {
        logout,
        setAuth,
        setProfile,
        auth,
        profile
    }

}

export default useAuthActions;