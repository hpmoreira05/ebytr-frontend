import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import loginImage from '../images/Saly-6imageLogin.png';
import logo from '../images/logo.png'
import '../styles/login.css'

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
      <img src={logo} alt="logo" className='logo'/>
      <div className='loginContainer'>
        <img src={loginImage} alt='Men holding a brush'/>
        <div className='formContainer'>
          <h2>Login</h2>
          <label htmlFor='emailLogin'>E-mail</label>
          <input
            type="email"
            id="emailLogin"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <label htmlFor='passwordLogin'>Senha</label>
          <input
            type="password"
            id="passwordLogin"
            onChange={ (e) => setPassword(e.target.value) }
          />
          <button
            className="btnLogin"
            type="button"
            disabled={ verifyEmailAndPassword() }
            onClick={ () => login() }
          >
            Entrar
          </button>
          {error && <div>{error}</div>}
          <div className="registerContainer">
            <div>Ainda não possui conta?</div>
            <Link to='/register'>
              <button className="btnRegister">
                Cadastrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;