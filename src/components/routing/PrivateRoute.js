import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contextStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const [{auth}] = useContext(AppContext);

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
