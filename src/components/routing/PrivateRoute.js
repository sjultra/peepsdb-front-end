import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthActions from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const {auth}= useAuthActions();



  const isAuthenticated = auth?.token ?true:false;



  return (  
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
