import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login() {
  const { setIsLogged } = useContext(AppContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
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
    const minLenght = 6;
    if (reg && password.length >= minLenght) {
      return false;
    }
    return true;
  };

  const login = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    }
    const response = await fetch('http://localhost:8080/users/login', requestOptions);
    const data = await response.json();
    if (data.message) {
      setError(data.message)
      return;
    } 
    localStorage.setItem('token', data.token)
    console.log(data.token)
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
      {error && <div>{error}</div>}
      <Link to='/register'>Não tem cadastro? Cadastre-se agora!</Link>
    </section>
  );
}

export default Login;