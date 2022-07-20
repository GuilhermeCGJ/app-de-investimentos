import React from 'react';
import { useContext } from 'react';
import ExpContext from '../context/ExpContext';
import { useNavigate  } from 'react-router-dom';

import './Header.css'

export default function Header () {
  const navigate = useNavigate ();
  const {
    user,
  } = useContext(ExpContext);

  const handleQuit = () => {
    navigate("../", { replace: true })
  };

  return (
    <div id='header'>
      <div className='header'>
        <div> logo </div>
        <details>
          <summary>{ user.email }</summary>
          <p>saldo</p>
          <p>{ user.lastAcess }</p>
          <p
            onClick={ handleQuit }
          >sair</p>
        </details>
      </div>
    </div>
  )
}