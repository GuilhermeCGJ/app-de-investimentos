import React from 'react';
import { useContext } from 'react';
import ExpContext from '../context/ExpContext';

import './Header.css'

export default function Header () {
  const {
    user,
  } = useContext(ExpContext);

  return (
    <div id='header'>
      <div className='header'>
        <div> logo </div>
        <details>
          <summary>{ user.email }</summary>
          <p>saldo</p>
          <p>{ user.lastAcess }</p>
          <p>sair</p>
        </details>
      </div>
    </div>
  )
}