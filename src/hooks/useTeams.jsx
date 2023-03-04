import { teamActions, selectTeam } from "../store/reducers/team";
import useWidget from "./useWidget"
import {useSelector,useDispatch} from 'react-redux'
import { useCallback, useRef } from "react";
import useAxios from "./useAxios";
import { useEffect } from "react";
import { renderJSX } from "../utils/helpers";

const useAppAudits = (limit)=>{

    const {setLogs:setL} = teamActions;

    const dispatch = useDispatch();

    let appLimit = limit

    // const {setLoading} = useWidget();

    const setLogs = useCallback((data)=>dispatch(setL(data)),[setL,dispatch])

    const Axios = useAxios();

    const fetchUserAudits = async()=>{
        try{
            // setLoading(false);
            let req = await Axios.get(`/audit${renderJSX(limit,`?limit=${appLimit}`,'')}`)
            setLogs(req.data);
        }
        catch(err){
            console.log('fetch user audit',err?.response)
            return { err:err?.response }
        }
        // finally{
        //     setLoading(false);
        // }
    }



    useEffect(()=>{
        fetchUserAudits()
    },[limit])
}

const useFetchProfiles = ()=>{
    const Axios = useAxios();

    const {setLoading} = useWidget();

    const {setProfiles:setP} = teamActions;

    const dispatch = useDispatch();

    const setProfiles = useCallback((data)=>dispatch(setP(data)),[setP,dispatch])

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

    const fetchProfilesRef= useRef(fetchAllProfiles)


    useEffect(()=>{
        fetchProfilesRef.current();
    },[])
}


const useTeams = ()=>{


    const {setProfiles:setP,replaceProfile:replaceP,updateProfile:updateP} = teamActions;
    const {setLoading} = useWidget();

    const Axios = useAxios()

    const dispatch = useDispatch();


    const setProfiles = useCallback((data)=>dispatch(setP(data)),[setP,dispatch])

    const replaceProfile = useCallback((data)=>dispatch(replaceP(data)),[replaceP,dispatch])

    const updateProfile = useCallback((data)=>dispatch(updateP(data)),[updateP,dispatch])


    const {profiles,logs} = useSelector(selectTeam);

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
        fetchUserProfile,
        useFetchProfiles,
        useAppAudits,
        replaceProfile,
        updateProfile,
        profiles,
        logs
    }


}

export default useTeams;