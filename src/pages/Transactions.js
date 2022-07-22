import React from 'react';
import Balance from '../components/Balance';
import DepositAndWithdrawal from '../components/DepositAndWithdrawal';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom'
import './Transactions.css'
import Header from '../components/Header';

export default function Transactions () {
  const navigate = useNavigate ();

  const handleClick = () => {
    navigate("../home", { replace: true })
  }; 
  
  return (
    <div id='transactions'>
      <Header />
      <div className="transactions-box">
        <TiArrowBack
          className="return-icon"
          size={50}
          color="#2C3333"
          onClick= { handleClick }
        />
        <Balance />
        <DepositAndWithdrawal />
      </div>
    </div>
  )
}