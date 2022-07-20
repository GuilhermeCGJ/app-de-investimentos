import React, { useState } from 'react';
import { useEffect } from 'react';

export default function RememberLogin() {
  const [ login, setLogin ] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem("remember");
    const response = JSON.parse(stored);
    setLogin(response)
  }, []);

  return (
    <div id="remember-login">
      <h1>{login}</h1>
    </div>
  )
}
