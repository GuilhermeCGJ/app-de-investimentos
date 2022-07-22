import React, { useEffect, useState } from 'react'
import LoginForm from '../components/Login/LoginForm'
import RememberLogin from '../components/Login/RememberLogin';
import logo from '../components/Assets/ExpLogo.png';
import './Login.css'

export default function Login () {

  const [ hasRemember, setHasRemember ] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem("remember");
    const response = JSON.parse(stored);
    if ( response ) {
      setHasRemember(true);
    } else {
      setHasRemember(false);
    }
  }, []);

  return (
    <div id='login'>
      <img src={logo} alt="logo"/>
      { hasRemember ? <RememberLogin /> : <LoginForm />}
      
    </div>
  )
}