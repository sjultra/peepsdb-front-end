import { teamActions, selectTeam } from "../store/reducers/team";
import Axios from "../utils/axios";
import useWidget from "./useWidget"
import {useSelector,useDispatch} from 'react-redux'
import { useCallback } from "react";


const useTeams = ()=>{


    const {setProfiles:setP} = teamActions;
    const {setLoading} = useWidget();


    const dispatch = useDispatch();

    const setProfiles = useCallback((data)=>dispatch(setP(data)),[setP,dispatch])

    const {profiles} = useSelector(selectTeam);


    const fetchAllProfiles = async()=>{
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
        fetchAllProfiles,
        profiles
    }


}

export default useTeams;