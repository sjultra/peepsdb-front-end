import React, { useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useMediaQuery, Box } from '@chakra-ui/react';
import ModalComponent from '../layouts/Modal';

import useAuthActions from '../../hooks/useAuth';

const AdminRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const { auth } = useAuthActions();

  const isAuthenticated =
    true || (auth?.isAuthenticated && auth?.role === 'admin') ? true : false;

  const is450px = useMediaQuery('(max-width: 450px)');

  const memoizeRenderedComponent = useMemo(
    () => (
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <Box p={is450px ? '0 2rem' : '0'}>
              <ModalComponent />
              <Component {...props} />
            </Box>
          )
        }
      />
    ),

    [isAuthenticated, Component]
  );

  return memoizeRenderedComponent;
};

export default AdminRoute;
