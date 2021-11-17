import React from 'react';
import './PageNotFound.css';
import Container from '../Container/Container';
import { useParams } from 'react-router';

export default function PageNotFound() {
  const { pageName } = useParams();

  return (
    <Container>
      <div className="Page-not-found">
        <h1>Error 404</h1>
        <img src="/img/alone.png" alt="logo" />
        <p>
          Lo sentimos página <strong>"{pageName}"</strong> no encontrada
        </p>
      </div>
    </Container>
  );
}
