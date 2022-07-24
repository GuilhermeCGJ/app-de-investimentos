import React, { useContext, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import ExpContext from '../../context/ExpContext';

export default function LoginForm() {
  const {
    setUser,
  } = useContext(ExpContext);
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
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]/; // Verifica se o email tem o format 'x@x.x'
    return regex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) { // verifica se a senha tem pelo menos 8 caracteres
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
        error: !isPasswordValid ? 'A senha deve ter pelo menos 8 caracteres' : '',
        hasError: !isPasswordValid,
        wasTouched: true,
      });
    }
  }

    const handleSubmit = () => {
      if (email.hasError || password.hasError) {
        alert('E-mail ou senha inválida');
      } else {
        const date = new Date();
        const now = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - 
        ${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
        setUser({
          email: email.value,
          lastAcess: now,
          money: 0,
          stocks: [],
        });
        if ( remember === true ) {
          localStorage.setItem("remember",JSON.stringify(email.value));
        }
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
            {/* Aviso de erro, caso exista */}
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
            
            {showPassword ? <BsEye
              className="show-password-input"
              onClick={(e) => setShowPassword(!showPassword)}
            /> :
            <BsEyeSlash
              className="show-password-input"
              onClick={(e) => setShowPassword(!showPassword)}
            />
            }
            <br />
            {/* Aviso de erro, caso exista */}
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
            className="login-button"
            onClick={handleSubmit}
          >
            Acessar
          </button>
        </form>
    )
  }
