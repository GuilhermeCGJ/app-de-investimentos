import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm() {
  const navigate = useNavigate ();
  const [email, setEmail] = useState({
    value: '',
    error: '',
    hasError: true,
    wasTouched: false,
  });
  const [password, setPassword] = useState({
    value: '',
    error: '',
    hasError: true,
    wasTouched: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const validateEmail = (email) => {
    const regex = /^(.+)@(.+)$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const isEmailValid = validateEmail(value);
      setEmail({
        value,
        error: !isEmailValid ? 'Digite um e-mail válido' : '',
        hasError: !isEmailValid,
        wasTouched: true,
      });
    } else if (name === 'password') {
      const isPasswordValid = validatePassword(value);
      setPassword({
        value,
        error: !isPasswordValid ? 'A senha deve ter pelo menos 6 caracteres' : '',
        hasError: !isPasswordValid,
        wasTouched: true,
      });
    }
    }

    const handleSubmit = () => {
      if (email.hasError || password.hasError) {
        alert('E-mail ou senha inválida');
      } else {
        navigate("../home", { replace: true })
      }
    };

    return (
        <form>
          <fieldset>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email.value}
              onChange={handleChange}
            />
            <br />
            {email.wasTouched && email.hasError && <small>{email.error}</small>}
          </fieldset>
          <fieldset className='password-wrapper'>
          <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Senha"
              value={password.value}
              onChange={handleChange}
            />
            <input
              className="show-password-input"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(!showPassword)}
            />
            <br />
            {password.wasTouched && password.hasError && <small>{password.error}</small>}
          </fieldset>
          <fieldset className='remember-wrapper'>
            <label htmlFor="remember" className='remember-input'>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <p>Lembre-se de mim </p> {'  '}
            </label>
            
          </fieldset>
          <button
            type="button"
            id='login-button'
            onClick={handleSubmit}
          >
            Acessar
          </button>
          <a href="a">Esqueceu a senha?</a>
        </form>
    )
  }
