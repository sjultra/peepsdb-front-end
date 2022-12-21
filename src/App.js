import './App.css';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Alert from './components/layouts/Alert';
import NotFoundScreen from './screens/NotFoundScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ADOWorkItemsScreen from './screens/ADOWorkItemsScreen';
import JiraIssuesScreen from './screens/JiraIssuesScreen';
import MeetingScheduleScreen from './screens/MeetingScheduleScreen';
import UserScreen from './screens/UserScreen';
import UserEditScreen from './screens/UserEditScreen';
import PrivateRoute from './components/routing/PrivateRoute';
import useLogin from './hooks/useLogin';
import './styles.sass';
import AdminRoute from './components/routing/AdminRoute';
import AdminUsers from './screens/Admin/users';
import AdminWorkspace from './screens/Admin/workspace';
import ModalComponent from './components/layouts/Modal';
import Audit from './screens/Admin/audit';
import useAppInsights from './hooks/useAppInsights';

const App = () => {

  const {initializeAzureLogging} = useAppInsights()

  const initAzureLoggingRef = useRef(initializeAzureLogging)

  useLogin();



  useEffect(()=>initAzureLoggingRef.current(),[])
  

  return (
    
    <Router>
        {/* <Alert /> */}

        <ModalComponent/>
        
        <Switch>

          <Route path='/login' component={LoginScreen} />
          <PrivateRoute exact path='/' component={DashboardScreen} />
          <PrivateRoute path='/profile' component={ProfileScreen} />
          <PrivateRoute path='/edit-profile' component={EditProfileScreen} />
          <PrivateRoute
            path='/ado_workitems/:id'
            component={ADOWorkItemsScreen}
          />
          <PrivateRoute path='/jira_issues/:id' component={JiraIssuesScreen} />
          <PrivateRoute path='/meeting' component={MeetingScheduleScreen} />
          <AdminRoute path='/admin/logs' component={Audit} />
          <AdminRoute path='/admin/users' component={AdminUsers} />
          <AdminRoute path='/admin/workspaces' component={AdminWorkspace} />
          <PrivateRoute path='/admin/users/:id' component={UserScreen} exact />
          <PrivateRoute
            path='/admin/users/:id/edit'
            component={UserEditScreen}
          />
          <Route component={NotFoundScreen} />
        </Switch>


    </Router>
  );
};

export default App;
