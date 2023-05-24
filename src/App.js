import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './Theme';

import './App.css';

import NotFoundScreen from './screens/NotFoundScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ADOWorkItemsScreen from './screens/ADOWorkItemsScreen';
import JiraIssuesScreen from './screens/JiraIssuesScreen';
import MeetingScheduleScreen from './screens/MeetingScheduleScreen';
import UserEditScreen from './screens/UserEditScreen';
import Teams from './screens/teams';
import Audit from './screens/Admin/audit';
import WorkerWorkspacesScreen from './screens/WorkerWorkspacesScreen';
import AdminWorkspace from './screens/Admin/workspace';
import User from './screens/teams/user';

import AdminRoute from './components/routing/AdminRoute';
import ModalComponent from './components/layouts/Modal';
import PrivateRoute from './components/routing/PrivateRoute';

import useLogin from './hooks/useLogin';
import useAppInsights from './hooks/useAppInsights';
import { MenuProvider } from './hooks/MenuProvider';

const App = () => {
  const { initializeAzureLogging } = useAppInsights();

  const initAzureLoggingRef = useRef(initializeAzureLogging);

  useLogin();

  useEffect(() => initAzureLoggingRef.current(), []);

  
  return (
    <MenuProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <ModalComponent />
          <Switch>
            <PrivateRoute
              path="/admin/users/:id/edit"
              _user="worker"
              component={UserEditScreen}
            />
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
            <PrivateRoute path="/teams" component={Teams} exact />
            <PrivateRoute path="/teams/user/:id" component={User} exact />

            <AdminRoute path="/admin/logs" component={Audit} />
            <AdminRoute path="/admin/workspaces" component={AdminWorkspace} />

            <Route path="/login" component={LoginScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Router>
      </ChakraProvider>
    </MenuProvider>
  );
};

export default App;
