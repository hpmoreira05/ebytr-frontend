import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

  // function handleClick() {
  //   localStorage.setItem('mealsToken', 1);
  //   localStorage.setItem('cocktailsToken', 1);
  //   const localStorageEmail = { email };
  //   localStorage.setItem('user', JSON.stringify(localStorageEmail));
  // }

  const verifyName = () => {
    const nameAndSurname = /[^\s]+\s+[^\s]+/;
    const nameValid = nameAndSurname.test(name);
    if (name === '') {
      setError('O campo "nome" é obrigatório') 
      return;
    };
    if(!nameValid) {
      setError('O campo "nome" deve ser preenchido com nome e sobrenome');
      return;
    };
  }

  const verifyEmail = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    if (email === '') {
      setError('O campo "email" é obrigatório');
      return;
    };
    if(!reg) {
      setError('Formato inválido para o campo "email"');
      return;
    };
  }

  const verifyPassword = () => {
    if(password === '') {
      setError('O campo "senha" é obrigatório');
      return;
    };
    if(password.length < 6){
      setError('Senha deve conter no mínimo 6 caracteres');
      return;
    }
    if(password !== confirmPassword) {
      setError('Senha inválida');
      return;
    };
  }

  useEffect(() => {
    setClicked(false);
    setError('');
    verifyPassword();
    verifyEmail();
    verifyName();
  }, [name, email, password, confirmPassword])

  const register = () => {
    setClicked(true)
    if(error === ''){
      history.push('/');
      return;
    }
  }

  return (
    <section>
      <label htmlFor="name">Nome:</label>
      <input
        id="name"
        type="text"
        placeholder="Nome"
        onChange={ (e) => setName(e.target.value) }
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="E-mail"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <label htmlFor="password">Senha:</label>
      <input
        id="password"
        type="password"
        placeholder="Senha"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <label htmlFor="confirmPassword">Confirmar senha:</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirmar senha"
        onChange={ (e) => setConfirmPassword(e.target.value) }
      />
      { clicked && <div>{ error }</div> }
      <button
        type="submit"
        onClick={ () => register() }
      >
        Cadastrar
      </button>
    </section>
  );
}

export default Register;