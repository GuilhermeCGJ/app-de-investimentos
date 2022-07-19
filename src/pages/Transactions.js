import React from 'react'
import Balance from '../components/Balance'
import DepositAndWithdrawal from '../components/DepositAndWithdrawal'
import { useNavigate } from 'react-router-dom'
import './Transactions.css'

export default function Transactions () {
  const navigate = useNavigate ();

  const handleClick = () => {
    navigate("../home", { replace: true })
  }; 
  
  return (
    <div id='transactions'>
      <button type="button" onClick= { handleClick }>
        Voltar
      </button>
      <Balance />
      <DepositAndWithdrawal />
    </div>
  )
}