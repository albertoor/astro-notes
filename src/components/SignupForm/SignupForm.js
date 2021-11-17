import { useState } from 'react';
import { useAuth } from '../../contexts/userContext';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import ContainerForm from '../ContainerForm/ContainerForm';
import Card from '../Card/Card';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUpUser, loading, error } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    signUpUser(email, password);
  };

  return (
    <ContainerForm>
      {loading ? (
        <Loader type="Grid" color="var(--success)" height={80} width={80} />
      ) : (
        <Card>
          <img src="/img/astronauta.png" alt="logo" className="Img-form" />
          <h1>Registrarte</h1>
          <form onSubmit={submit}>
            <Input
              className="Input"
              type="text"
              value={email}
              placeholder="Ingresa tu correo"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="Input"
              type="password"
              value={password}
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="success-btn">
              Registrarme
            </Button>
          </form>
          <p className="Msg-link ">
            Ya tienes cuenta?<Link to="/login"> Iniciar Sesión</Link>
          </p>
          {error ? (
            <p className="Msg-alert">Usuario y/o Contraseña incorrrecto</p>
          ) : null}
        </Card>
      )}
    </ContainerForm>
  );
}
