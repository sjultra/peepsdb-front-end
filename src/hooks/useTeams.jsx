import { teamActions, selectTeam } from "../store/reducers/team";
import useWidget from "./useWidget"
import {useSelector,useDispatch} from 'react-redux'
import { useCallback } from "react";
import useAxios from "./useAxios";


const useTeams = ()=>{


    const {setProfiles:setP} = teamActions;
    const {setLoading} = useWidget();

    const Axios = useAxios()

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

    const fetchUserProfile = async(id)=>{
        try{
            let req = await Axios.get(`/profiles/${id}`);

            let {data} = req;

            if(data) {
                return {data}
            }

        }
        catch(err){
            return  {
                error:err
            }
        }
    }

    return {
        fetchAllProfiles,
        profiles,
        fetchUserProfile
    }


}

export default useTeams;