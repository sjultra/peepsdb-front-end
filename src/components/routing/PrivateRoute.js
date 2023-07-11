import React, { useEffect,useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import useAuthActions from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const { auth } = useAuthActions();

  const isAuthenticated = auth?.isAuthenticated ? true : false;

  useEffect(()=>console.log('auth value in private component',auth),[auth])

  const memoizeRenderedComponent = useMemo(
    () => (
      <Box mb="6rem">
        <Route
          {...rest}
          render={(props) =>
            !isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <Box>
                <Component {...props} />
              </Box>
            )
          }
        />
      </Box>
    ),

    [isAuthenticated, Component]
  );

  return memoizeRenderedComponent;
};

export default PrivateRoute;
