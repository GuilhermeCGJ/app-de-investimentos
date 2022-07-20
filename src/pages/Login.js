import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RememberLogin from '../components/RememberLogin';
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
      { hasRemember ? <RememberLogin /> : <LoginForm />}
      
    </div>
  )
}