import React from 'react';
import { useAuth } from '../contexts/userContext';
import { Route, Redirect } from 'react-router';

export default function PublicRoute({ component: Component, ...props }) {
  const { user } = useAuth();

  return (
    <Route
      {...props}
      render={(routeProps) =>
        !user ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
}
