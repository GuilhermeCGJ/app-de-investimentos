import React from 'react'
import Balance from '../components/Balance'
import DepositAndWithdrawal from '../components/DepositAndWithdrawal'
import './Transactions.css'

export default function Transactions () {

  return (
    <div id='transactions'>
      <button>
        Voltar
      </button>
      <Balance />
      <DepositAndWithdrawal />
    </div>
  )
}