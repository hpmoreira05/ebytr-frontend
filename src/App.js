import React from "react";
import { Switch , Route, Redirect } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import Home from './pages/Home'
import Register from './pages/Register'

const isAutenticated = async () => {
  const token = localStorage.getItem('token')
  const requestOptions = {
    method: 'GET',
    headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
  }
  const isValid = await fetch('http://localhost:8080/validateToken', requestOptions);
  const response = await isValid.json();
  if(response.message && response.message === 'Authorized'){
    return true
  }
  if(response.err && response.err.code === 400){
    return false
  }
}

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    isAutenticated() ? (
    <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.loctation }}} />
    )
  )} />
)

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login }/>
        <PrivateRoute path="/home" component={ Home }/>
        <Route exact path="/register" component={ Register }/>
      </Switch>
    </AppProvider>
  );
}

export default App;
