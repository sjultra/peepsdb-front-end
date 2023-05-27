import React, { Children, useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Box } from '@chakra-ui/react';
import useWidget from '../../hooks/useWidget';
import ModalComponent from '../layouts/Modal';

import useAuthActions from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const { auth } = useAuthActions();

  const { modal } = useWidget();

  const { children: Child, payload, isOpen } = modal;

  const isAuthenticated = auth?.isAuthenticated ? true : false;

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
