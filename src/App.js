import React from "react";
import { Switch , Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login }/>
        <Route exact path="/home" component={ Home }/>
        <Route exact path="/register" component={ Register }/>
      </Switch>
    </AppProvider>
  );
}

export default App;
