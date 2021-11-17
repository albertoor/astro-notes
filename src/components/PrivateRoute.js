import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../contexts/userContext';

export default function PrivateRoute({ component: Component, ...props }) {
  const { user } = useAuth();

  return (
    <Route
      {...props}
      render={(routeProps) =>
        user ? <Component {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
}
