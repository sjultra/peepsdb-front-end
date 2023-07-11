
import { useDispatch, useSelector } from 'react-redux'
import {
  getAdoProjects,
  getAllWorkItemsId,
  getAllWorkItemsDetails,
} from '../../actions/adoActions';
import { useEffect } from 'react';


export const useAdo = (type)=>{
    
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.adoProjects?.projects)
    const loading = useSelector((state) => state.adoProjects?.loading)
    const error = useSelector((state) => state.adoProjects?.error)
    const workItemsId = useSelector((state) => state.allWorkItemsId?.workItemsId)
    const workItems = useSelector(
      (state) => state.allWorkItemsDetails?.workItemsDetails
    )

  
  
    // Get all ADO Projects
    useEffect(() => {
      if (!projects && type==='projects') {
        dispatch(getAdoProjects())
      }
    }, [projects, dispatch])
  
    // Get all workitems id
    useEffect(() => {
      if (!workItemsId && type ==='workItems') {
        dispatch(getAllWorkItemsId())
      }
    }, [workItemsId, dispatch])
  
    // Get all workitems details
    useEffect(() => {
      if (!workItems) {
        let ids
        if (workItemsId && type==='workItems') {
          ids = workItemsId.map((item) => item.id)
          dispatch(getAllWorkItemsDetails(ids))
        }
      }
    }, [workItems, dispatch, workItemsId])

    return{
        projects,
        adoLoading:loading,
        adoError: error,
        workItems
    }
}