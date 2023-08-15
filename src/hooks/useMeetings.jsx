import { meetingActions, selectMeeting } from "../store/reducers/meeting";
import Axios from "../utils/axios";
import useWidget from "./useWidget"
import {useSelector,useDispatch} from 'react-redux'
import { useCallback } from "react";


const useMeetings = ()=>{


    const {setProfiles:setP} = meetingActions;
    const {setLoading} = useWidget();


    const dispatch = useDispatch();

    const setProfiles = useCallback((data)=>dispatch(setP(data)),[setP,dispatch])

    const {profiles} = useSelector(selectMeeting);


    const fetchAllUsers = async()=>{
        try{
            setLoading(true);
            const req = await Axios.get('/profiles');

            setProfiles(req.data);

            return {
                data:req.data
            }
        }
        catch(err){
            return {
                err:err?.response
            }

        }
        finally{
            setLoading(false);

        }

    }


    return {
        fetchAllUsers,
        profiles
    }


}

export default useMeetings;