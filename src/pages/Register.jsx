import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import registerImage from '../images/Saly-7imageRegister.png'; 
import logo from '../images/logo.png';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

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

  const register = async () => {
    setClicked(true)
    if(error === ''){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          name, 
          email,
          password
        })
      }
      const response = await fetch('http://localhost:8080/users', requestOptions);
      const data = await response.json();
      if (data.message) {
        setError(data.message)
        return;
      } 
      history.push('/');
      return;
    }
  }

  return (
    <section>
      <img src={logo} alt="logo" className='logo'/>
      <div className='loginContainer'>
        <img src={registerImage} alt="woman"/>
        <div className='formContainer'>
          <h2>Cadastro</h2>
          <label htmlFor="name">Nome completo</label>
          <input
            id="name"
            type="text"
            placeholder="Nome"
            onChange={ (e) => setName(e.target.value) }
          />
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            onChange={ (e) => setPassword(e.target.value) }
          />
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            onChange={ (e) => setConfirmPassword(e.target.value) }
          />
          { clicked && <div>{ error }</div> }
          <button
            type="submit"
            className="btnLogin"
            onClick={ () => register() }
          >
            Cadastrar
          </button>
          <div className="registerContainer">
            <div>Já possui conta?</div>
            <Link to='/'>
              <button className="btnRegister">Login</button>
            </Link>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Register;