import './App.css';
import { Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Signup from './pages/Signup/Signup';
import PageNotFound from './components/PageNotFound/PageNotFound';

export default function App() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <PublicRoute path="/login" component={Login} exact />
        <PublicRoute path="/signup" component={Signup} exact />
        <PublicRoute path="/:pageName" component={PageNotFound} exact />
      </Switch>
    </>
  );
}
