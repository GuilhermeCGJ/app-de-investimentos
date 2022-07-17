import React from 'react'
import { useContext } from 'react';
import ExpContext from '../context/ExpContext';
import './StockMarket.css';

export default function StockMarket () {
  const {
    setMarketPopup,
    } = useContext(ExpContext);

  const handleClose = () => {
    setMarketPopup(false);
  };

  return (
    <div className="stock-market">
      <div className="market-box">
        
        <button
          type='button'
          onClick={handleClose}
        >
          Voltar
        </button>
        
      </div>
    </div>
  )
}