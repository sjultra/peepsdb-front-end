import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllIssues, getJiraLabels } from '../../actions/jiraActions'
import useAxios from '../useAxios'



export const useJira =(type)=>{
    
    const labels = useSelector((state) => state.jiraLabels.labels)

    const issues = useSelector((state) => state.allIssues.issues)
    
    const labelLoading = useSelector((state) => state.jiraLabels.loading)  

    const dispatch = useDispatch();
  
    const ref = useRef( type==='labels'? labels: issues);

    const axios = useAxios();


    const effectCallRef = useRef({
        'labels':()=>getJiraLabels(axios),
        'issues':(startAt=0)=>getAllIssues(startAt,axios) 
    })


    useEffect(() => {
        if (!ref?.current?.length && effectCallRef?.current[type]) {
            dispatch(effectCallRef.current[type]())
        }
    }, [dispatch,type]);
    
    

    return {
        labels,
        labelLoading,
        issues
    }


}


