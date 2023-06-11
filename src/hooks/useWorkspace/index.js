
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
  
  const {issues,labelLoading:jiraLoading} = useJira('issues');

  const {workItems,adoLoading} = useAdo('workItems')


  const tasks = [...issues]
  
  return {
    issues,
    workItems,
    tasks
  }
}



