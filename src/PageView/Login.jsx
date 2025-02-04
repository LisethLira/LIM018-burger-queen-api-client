/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsers } from '../Requests/requestApi';
import emailIcon from '../imagen/mail.png';
import passwordIcon from '../imagen/password.png';
import '../App.scss';

const { Buffer } = require('buffer/');

export const regexEmail = /\S+@\S+\.\S+/g;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const onClickLogin = () => {
    if (email.length === 0) {
      setEmailMessage('Ingrese un correo electrónico');
    } if (password.length === 0) {
      setPasswordMessage('Ingrese una contraseña');
    } else if (regexEmail.test(email) === false && email.length !== 0) {
      setEmailMessage('Correo inválido');
    } else {
      loginUsers(email, password)
        .then((response) => {
          sessionStorage.setItem('token', response.token);
          const token = sessionStorage.getItem('token');
          function parseJwt(jwt) {
            return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
          }
          if (parseJwt(token).role === 'mesero') {
            navigate('/Menu');
          } else if (parseJwt(token).admin === true) {
            console.log(parseJwt(token).admin);
            navigate('/UsersAdmin');
          } else {
            navigate('/OrdersChef');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onAddEmail = (e) => {
    setEmail(e.target.value);
    setEmailMessage('');
  };

  const onAddPassword = (e) => {
    setPassword(e.target.value);
    setPasswordMessage('');
  };

  return (
    <div className="Background-login">
      <div className="Form-login">
        <h1>Iniciar Sesión</h1>
        <div>
          <div className="Form-input">
            <img src={emailIcon} className="Icon-login" alt="logo" />
            <input type="email" data-testid="input-email" onChange={(e) => onAddEmail(e)} className="Input-login" placeholder="Correo electrónico" />
            {/* {(/\S+@\S+\.\S+/g).test(email) === false ? <span>correo invalido</span> : <span> </span> } */}
          </div>
          <span data-testid="spanMessage" className="Span-notification">{emailMessage}</span>
        </div>

        <div>
          <div className="Form-input">
            <img src={passwordIcon} className="Icon-login" alt="logo" />
            <input type="password" data-testid="input-password" onChange={(e) => onAddPassword(e)} className="Input-login" placeholder="Contraseña" />
          </div>
          <span data-testid="span-error" className="Span-notification">{passwordMessage}</span>
        </div>

        <button data-testid="btnLogin" className="Button-login" type="button" onClick={() => onClickLogin()}>
          {/* <p className="Text-button">Iniciar Sesión</p> */}
          Ingresar
        </button>
      </div>
    </div>
  );
}
