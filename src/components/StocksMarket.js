import React from 'react'
import { useContext, useState } from 'react';
import ExpContext from '../context/ExpContext';
import './StockMarket.css';

export default function StocksMarket () {
  const {
    setMarketPopup,
    marketStock,
    // setMarketStock,
    // myStocks,
    // setMyStocks,
    handleBuy,
    } = useContext(ExpContext);

  const [buy, setBuy] = useState({
    value: 0,
    error: '',
    hasError: false,
    wasTouched: false,
  });
  const [sell, setSell] = useState({
    value: 0,
    error: '',
    hasError: false,
    wasTouched: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'buy') {
      setBuy({
        value,
        hasError: false,
        wasTouched: value > 0
      });
    } else if (name === 'sell') {
      setSell({
        value,
        hasError: false,
        wasTouched: value > 0
      });
    }
  }

  const handleSubmit = () => {
    if (buy.hasError || sell.hasError) {
      alert('Valores incorretos');
    } else {
      if (buy.value > 0) {
        handleBuy(buy.value);
      }
    }
  };

  const handleClose = () => {
    setMarketPopup(false);
  };

  return (
    <div className="stock-market">
      <div className="market-box">
        <div className='trade-title'>
          <h1>Comprar/Vender Ação</h1>
        </div>
        <div className='stocks-header'>
          <div className='info-box code-box bg-gray'> 
            <p> Código </p>
          </div>
          <div className='info-box amount-box bg-gray'> 
            <p> Qtde </p>
          </div>
          <div className='info-box value-box bg-gray'> 
            <p> Valor (R$) </p>
          </div>
        </div>
        <div className='trade-stock'>
          <div className='info-box code-box'> 
            <p> {marketStock.code} </p>
          </div>
          <div className='info-box amount-box'> 
            <p> {marketStock.amount} </p>
          </div>
          <div className='info-box value-box'> 
            <p> {marketStock.value} </p>
          </div>
        </div>
        <div className='trade-options'>
          <fieldset className='buy-wrapper'>
            <label htmlFor="buy" className='buy-input'>
              <input
                type="number"
                name="buy"
                value={buy.value}
                onChange={handleChange}
                disabled={sell.wasTouched}
              />
              <p>Comprar </p>
            </label>
          </fieldset>
          <fieldset className='sell-wrapper'>
            <label htmlFor="sell" className='sell-input'>
              <input
                type="number"
                name="sell"
                value={sell.value}
                onChange={handleChange}
                disabled={buy.wasTouched}
              />
              <p>Vender </p>
            </label>
          </fieldset>
        </div>
        <div className='buttons-area'>
          <button
            type='button'
            onClick={handleClose}
          >
            Voltar
          </button>
          <button
            type='button'
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>
        
      </div>
    </div>
  )
}