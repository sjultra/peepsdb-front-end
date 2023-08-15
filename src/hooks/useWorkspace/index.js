
import { useMemo } from 'react'
import { useAdo } from './ado'
import { useJira } from './jira'


export const useWorkspaceProjects = ()=>{

  const {labels,labelLoading} = useJira('labels')

  const { projects:adoProjects,adoLoading,adoError} = useAdo('projects')
  
  const loading = labelLoading || adoLoading ?  true:false;


  const adoProjectPayload = adoProjects?.map(entry=>({
    ...entry,
    provider:'ado',
  })) || []

  const jiraProjectPayload = labels?.map(entry=>({
    name:entry,
    provider:'jira'
  })) || []

  const projects = loading? []: [...jiraProjectPayload,...adoProjectPayload].sort((a, b) => a.name.localeCompare(b.name)); 
  

  return {
    labels,
    loading,
    projects
  }

}


export const useWorkspaceTasks = ()=>{
  
  const {issues:jiraIssues,labelLoading:jiraLoading} = useJira('issues');

  const {workItems:adoWorkItems,adoLoading} = useAdo('workItems');

  const issues= jiraIssues || [];

  const workItems = adoWorkItems || []

  const jiraTaskPayload = useMemo(()=> issues?.map(issue=>({
    ...issue,
    provider:'jira'
  })),[issues])

  const adoWorkItemPayload = useMemo(()=>workItems?.map(workItem=>({
    ...workItem,
    provider:'ado'
  })),[workItems])


  const tasks = [...jiraTaskPayload,...adoWorkItemPayload].sort((a,b)=>Date.parse(a?.updated) > Date.parse(b?.updated)?-1:1 )
  
  const loading = jiraLoading || adoLoading ;



  return {
    issues,
    workItems,
    tasks,
    loading
  }
}



