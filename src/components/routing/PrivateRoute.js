import React, { Children, useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import useAuthActions from '../../hooks/useAuth';
import useWidget from '../../hooks/useWidget';
import ModalComponent from '../layouts/Modal';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Selectors
  const {auth}= useAuthActions();

  const {modal} = useWidget();

  const { children:Child,payload,isOpen } = modal

  const isAuthenticated = auth?.isAuthenticated ?true:false;

  const RouteLayout = styled.div`
  
    padding: 0 5rem;

    @media (max-width: 768px) {
      padding: 0 3rem;
    }

    @media (max-width: 450px) {
      padding: 0 2rem;
    }


  `

  const memoizeRenderedComponent = useMemo(()=>  
    <div className='padding-x page-bottom-margin'>

      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? 
          <Redirect to='/login' /> : 
          <RouteLayout>
            <Component {...props} />
          </RouteLayout>
        }
      />

    </div>

  ,[isAuthenticated,Component])

  return ( memoizeRenderedComponent );
};

export default PrivateRoute;
