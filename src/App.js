import "./App.css"
import React, { useEffect, useRef } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import NotFoundScreen from "./screens/NotFoundScreen"
import DashboardScreen from "./screens/DashboardScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import EditProfileScreen from "./screens/EditProfileScreen"
import ADOWorkItemsScreen from "./screens/ADOWorkItemsScreen"
import JiraIssuesScreen from "./screens/JiraIssuesScreen"
import MeetingScheduleScreen from "./screens/MeetingScheduleScreen"
import UserEditScreen from "./screens/UserEditScreen"
import PrivateRoute from "./components/routing/PrivateRoute"
import useLogin from "./hooks/useLogin"
import AdminRoute from "./components/routing/AdminRoute"
import Teams from "./screens/teams"
import AdminWorkspace from "./screens/Admin/workspace"
import WorkerWorkspacesScreen from "./screens/WorkerWorkspacesScreen"
import ModalComponent from "./components/layouts/Modal"
import Audit from "./screens/Admin/audit"
import useAppInsights from "./hooks/useAppInsights"
import { MenuProvider } from "./hooks/MenuProvider"
import User from "./screens/teams/user"

const App = () => {
  const { initializeAzureLogging } = useAppInsights()

  const initAzureLoggingRef = useRef(initializeAzureLogging)

  useLogin()

  useEffect(() => initAzureLoggingRef.current(), [])

  return (
    <MenuProvider>
      <ChakraProvider>
        <Router>
          {/* <Alert /> */}
          <ModalComponent />
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <PrivateRoute exact path="/" component={DashboardScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <PrivateRoute path="/edit-profile" component={EditProfileScreen} />
            <PrivateRoute
              path="/ado_workitems/:id"
              component={ADOWorkItemsScreen}
            />
            <PrivateRoute
              path="/jira_issues/:id"
              component={JiraIssuesScreen}
            />
            <PrivateRoute path="/meeting" component={MeetingScheduleScreen} />
            <PrivateRoute
              path="/worker/workspaces"
              component={WorkerWorkspacesScreen}
            />
            <AdminRoute path="/admin/logs" component={Audit} />
            <PrivateRoute path="/teams" component={Teams} exact/>
            <PrivateRoute path="/teams/user/:id" component={User} exact />
            <AdminRoute path="/admin/workspaces" component={AdminWorkspace} />

            {/* <PrivateRoute path='/admin/users/:id' component={UserScreen} exact /> */}
            <PrivateRoute
              path="/admin/users/:id/edit"
              _user="worker"
              component={UserEditScreen}
            />
            <Route component={NotFoundScreen} />
          </Switch>
        </Router>
      </ChakraProvider>
    </MenuProvider>
  )
}

export default App
