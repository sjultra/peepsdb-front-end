import React, { useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import useAuthActions from '../../hooks/useAuth';
import ModalComponent from '../layouts/Modal';

const AdminRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const { auth } = useAuthActions();

  const isAuthenticated =
    true || (auth?.isAuthenticated && auth?.role === 'admin') ? true : false;

  const RouteLayout = styled.div`
    /* padding: 0 5rem; */
    @media (max-width: 768px) {
      /* padding: 0 3rem; */
    }
    @media (max-width: 450px) {
      padding: 0 2rem;
    }
  `;

  const memoizeRenderedComponent = useMemo(
    () => (
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <RouteLayout>
              <ModalComponent />
              <Component {...props} />
            </RouteLayout>
          )
        }
      />
    ),

    [isAuthenticated, Component]
  );

  return memoizeRenderedComponent;
};

export default AdminRoute;
