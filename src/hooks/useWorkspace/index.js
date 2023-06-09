
import { useAdo } from './ado'
import { useJira } from './jira'


export const useWorkspaceProjects = (activeTab)=>{
  
  let shouldMakeCalls = activeTab==='Projects';

  console.log('active',activeTab)

  const {labels,labelLoading} = useJira(shouldMakeCalls? 'labels':'')

  const { projects:adoProjects,adoLoading,adoError} = useAdo(shouldMakeCalls? 'projects':'')
  
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
  
  console.log('all projects',projects)

  return {
    labels,
    loading,
    projects
  }

}


export const useWorkspaceTasks = (activeTab)=>{
  
  let shouldMakeCalls = activeTab==='Tasks'

  const {issues,labelLoading:jiraLoading} = useJira(shouldMakeCalls? 'tasks':'');

  const {workItems,adoLoading} = useAdo(shouldMakeCalls? 'workItems':'')


  
  return {
    issues,
    workItems
  }
}



