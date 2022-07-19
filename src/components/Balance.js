import React from 'react'
import { useContext } from 'react'
import ExpContext from '../context/ExpContext'

export default function Balance () {
  const {
    user,
    } = useContext(ExpContext);

  return (
    <div id='balance'>
      <h3>{`Saldo em Conta: `}</h3>
      { ' ' }
      <h2>{` R$ ${ user.money }`}</h2>
    </div>
  )
}