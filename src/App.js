import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
// import Alert from './components/layouts/Alert';
import NotFoundScreen from './screens/NotFoundScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ADOWorkItemsScreen from './screens/ADOWorkItemsScreen';
import JiraIssuesScreen from './screens/JiraIssuesScreen';
import MeetingScheduleScreen from './screens/MeetingScheduleScreen';
import UsersScreen from './screens/UsersScreen';
import UserScreen from './screens/UserScreen';
import UserEditScreen from './screens/UserEditScreen';
import PrivateRoute from './components/routing/PrivateRoute';
import useLogin from './hooks/useLogin';
import './styles.sass';

const App = () => {

  useLogin();

  return (
    <Router>

      <Navbar />

      <div className='padding-x page-bottom-margin'>
        {/* <Alert /> */}

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
          <PrivateRoute exact path='/admin/users' component={UsersScreen} />
          <PrivateRoute path='/admin/users/:id' component={UserScreen} exact />
          <PrivateRoute
            path='/admin/users/:id/edit'
            component={UserEditScreen}
          />
          <Route component={NotFoundScreen} />
        </Switch>

      </div>

    </Router>
  );
};

export default App;
