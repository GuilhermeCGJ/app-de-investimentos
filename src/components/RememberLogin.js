import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

export default function RememberLogin() {
  const navigate = useNavigate ();
  const [ login, setLogin ] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem("remember");
    const response = JSON.parse(stored);
    setLogin(response)
  }, []);

  const handleSubmit = () => {
    navigate("../home", { replace: true })
  };
  const handleQuit = () => {
    localStorage.setItem("remember",JSON.stringify(""));
    window.location.reload()
  };

  return (
    <div id="remember-login">
      <h2>Entrar Com</h2>
      <div className="saved-login">
        <h3>{login}</h3>
      </div>
      <button
        type="button"
        className="login-button"
        onClick={ handleSubmit }
      >
        Acessar
      </button>
      <p onClick={ handleQuit }>
        Essa não é a sua conta? <small> Clique aqui para fazer login com outra conta</small>
      </p>
    </div>
  )
}
