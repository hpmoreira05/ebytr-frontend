import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { useHistory } from 'react-router-dom';

function Login() {
  const { setIsLogged } = useContext(AppContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  // function handleClick() {
  //   localStorage.setItem('mealsToken', 1);
  //   localStorage.setItem('cocktailsToken', 1);
  //   const localStorageEmail = { email };
  //   localStorage.setItem('user', JSON.stringify(localStorageEmail));
  // }

  const verifyEmailAndPassword = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    const maxLenght = 6;
    if (reg && password.length > maxLenght) {
      return false;
    }
    return true;
  };

  const login = () => {
    setIsLogged(true)
    if(setIsLogged){
      history.push('/home');
    }
  }

  return (
    <section>
      <input
        type="email"
        data-testid="email-input"
        placeholder="E-mail"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Senha"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ verifyEmailAndPassword() }
        onClick={ () => login() }
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;