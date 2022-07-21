import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import ExpContext from '../context/ExpContext';

export default function StocksMarket () {
  const {
    setMarketPopup,
    marketStock,
    updateInvestValue,
    invested,
    toBuy,
    updateAvailableAmount,
    handleBuy,
    handleSell,
    user,
    myStocks,
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

  useEffect(() => {
    updateInvestValue();
    updateAvailableAmount();
  }, []);

  useEffect(() => {
    console.log(myStocks);

  }, [myStocks])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'buy') {
      setBuy({
        value,
        error: '',
        hasError: false,
        wasTouched: value > 0
      });
    } else if (name === 'sell') {
      setSell({
        value,
        error: '',
        hasError: false,
        wasTouched: value > 0
      });
    }
  }

  const handleSubmit = () => {
    if ( buy.wasTouched ) {
      const expense = parseFloat(buy.value) * parseFloat(marketStock.value);
      if (buy.value > toBuy) {
        alert('Não há essa quantidade de ações para serem compradas');
      } else if ( expense > user.money) {
        alert('Saldo insuficiente');
      } else if (buy.value < 0) {
        alert('Valores incorretos');
      } else {
        handleBuy(buy.value);
      }
    } else if ( sell.wasTouched ) {
      if (sell.value > invested.amount) {
        alert('Você não tem essa quantidade de ações para vender');
      } else {
        handleSell(sell.value);
      }
    } else {
      alert('Você não selecionou nenhuma transação');
    }
  };

  const handleClose = () => {
    setMarketPopup(false);
  };

  return (
    <div className="stock-market">
      <div className="market-box">
        <div className="user-infos">
          <h3>{`Usuário: ${user.email}`}</h3>
          <h3>{`Saldo: ${user.money.toFixed(2)}`}</h3>
        </div>
        <div className="stock-infos">
          <h3>{`Suas ações dessa empresa: ${invested.amount}`}</h3>
          <h3>{`Valor investido nessa empresa: ${invested.value.toFixed(2)}`}</h3>
        </div>
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
            <p> {toBuy} </p>
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