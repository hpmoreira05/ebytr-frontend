import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const register = () => {
      history.push('/');
  }

  return (
    <section>
      <input
        type="text"
        placeholder="Nome"
        onChange={ (e) => setName(e.target.value) }
      />
      <input
        type="email"
        placeholder="E-mail"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        onChange={ (e) => setConfirmPassword(e.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ verifyEmailAndPassword() }
        onClick={ () => register() }
      >
        Cadastrar
      </button>
    </section>
  );
}

export default Register;