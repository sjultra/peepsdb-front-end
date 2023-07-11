import React from "react"
import WorkerAsideBar from "../components/layouts/WorkerAsideBar"
import ActivityLogs from "../components/logs/ActivityLogs"

const WorkerWorkspacesScreen = () => {  
  return (
    <WorkerAsideBar>
      <ActivityLogs />
    </WorkerAsideBar>
  );
}

export default WorkerWorkspacesScreen