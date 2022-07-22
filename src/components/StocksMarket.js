import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ExpContext from '../context/ExpContext';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Erro!',
          text: 'Não há essa quantidade de ações para serem compradas',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else if ( expense > user.money) {
        Swal.fire({
          title: 'Erro!',
          text: 'Saldo insuficiente',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else if (buy.value < 0) {
        Swal.fire({
          title: 'Erro!',
          text: 'Valores Incorretos',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Compra realizada',
          icon: 'sucess',
          confirmButtonText: 'Continuar'
        });
        handleBuy(buy.value);
        setMarketPopup(false);
      }
    } else if ( sell.wasTouched ) {
      if (sell.value > invested.amount) {
        Swal.fire({
          title: 'Erro!',
          text: 'Você não tem essa quantidade de ações para vender',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Venda realizada',
          icon: 'sucess',
          confirmButtonText: 'Continuar'
        });
        handleSell(sell.value);
        setMarketPopup(false);
      }
    } else {
      Swal.fire({
        title: 'Algo de Errado!',
        text: 'Você não selecionou nenhuma transação',
        icon: 'question',
        confirmButtonText: 'Tentar Novamente'
      });
    }
  };

  const handleClose = () => {
    setMarketPopup(false);
  };

  return (
    <div className="stock-market">
      <div className="market-box">
        <IoIosCloseCircleOutline
          color="red"
          size={30}
          className="close-x"
          onClick={handleClose}
        />
        <div className="user-infos" >
          <div>
            <h4>{`Usuário:`}</h4>
            <h5>{`${user.email}`}</h5>
          </div>
          <div>
            <h4>{`Saldo:`}</h4>
            <h5>{`R$${user.money.toFixed(2)}`}</h5>
          </div>
        </div>
        <div className="stock-infos">
          <div>
            <h4>{`Ações dessa empresa:`}</h4>
            <h5>{`${invested.amount}`}</h5>
          </div>
          <div>
            <h4>{`Investimento:`}</h4>
            <h5>{`R$${invested.value.toFixed(2)}`}</h5>
          </div>
        </div>
        <div className='trade-title'>
          <h1>Comprar/Vender Ação</h1>
        </div>
        <div>
          <div className='stocks-header'>
            <div className='info-box code-box bg-gray'> 
              <p className="text-box"> Código </p>
            </div>
            <div className='info-box amount-box bg-gray'> 
              <p className="text-box"> Qtde </p>
            </div>
            <div className='info-box value-box bg-gray'> 
              <p className="text-box"> Valor (R$) </p>
            </div>
          </div>
          <div className='trade-stock'>
            <div className='info-box code-box'> 
              <p className="text-box"> {marketStock.code} </p>
            </div>
            <div className='info-box amount-box'> 
              <p className="text-box"> {toBuy} </p>
            </div>
            <div className='info-box value-box'> 
              <p className="text-box"> {marketStock.value} </p>
            </div>
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
              <p className="text-box buy-sell">Comprar </p>
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
              <p className="text-box buy-sell">Vender </p>
            </label>
          </fieldset>
          { buy.wasTouched && <h4>{`Valor total: R$${(buy.value * marketStock.value).toFixed(2)}`} </h4>}
          { sell.wasTouched && <h4>{`Valor total: R$${(sell.value * marketStock.value).toFixed(2)}`} </h4>}
        </div>
        <div className='buttons-area'>
          <button
            type='button'
            className="confirm-button"
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>
        
      </div>
    </div>
  )
}