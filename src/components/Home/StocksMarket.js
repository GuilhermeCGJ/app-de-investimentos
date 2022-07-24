import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ExpContext from '../../context/ExpContext';
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

  useEffect(() => { //Ao abrir o PopUp
    updateInvestValue(); // calcula o valor investido em ações dessa empresa
    updateAvailableAmount(); // verifica se houve atualização na quantidade de ações que há para serem compradas
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
    if ( buy.wasTouched ) { // Verifica se a opção de compra que foi escolhida
      const expense = parseFloat(buy.value) * parseFloat(marketStock.value); // Valor total a ser gasto se confirmar a compra das aões
      if (buy.value > toBuy) { // Verifica se tem ações o suficiente pra serem compradas
        Swal.fire({
          title: 'Erro!',
          text: 'Não há essa quantidade de ações para serem compradas',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else if ( expense > user.money) { // Verifica se o usuário tem dinheiro pra comprar essas ações
        Swal.fire({
          title: 'Erro!',
          text: 'Saldo insuficiente',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else if (buy.value < 0) { // Verifica se o usuário não digitou um valor negativo
        Swal.fire({
          title: 'Erro!',
          text: 'Valores Incorretos',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else {
        Swal.fire({ // Sucesso na compra
          title: 'Sucesso!',
          text: 'Compra realizada',
          icon: 'sucess',
          confirmButtonText: 'Continuar'
        });
        handleBuy(buy.value); // Realiza a baixa das ações a venda  e coloca a nova ação na carteira do usuário, descontando o preço pago por elas de sua conta
        setMarketPopup(false); // Fecha o PopUp
      }
    } else if ( sell.wasTouched ) { // Verifica se a opção de venda foi a selecionada
      if (sell.value > invested.amount) { // Verifica se o usuário tem essa quantidade de ações para serem vendidas
        Swal.fire({
          title: 'Erro!',
          text: 'Você não tem essa quantidade de ações para vender',
          icon: 'error',
          confirmButtonText: 'Tentar Novamente'
        });
      } else {
        Swal.fire({ // Sucesso na venda
          title: 'Sucesso!',
          text: 'Venda realizada',
          icon: 'sucess',
          confirmButtonText: 'Continuar'
        });
        handleSell(sell.value); // Adiciona o valor da venda no saldo do usuário e diminui a quantidade de ações em sua carteira
        setMarketPopup(false);// Fecha o PopUp
      }
    } else { // Caso nenhum valor tenha sido digitado em compra ou venda
      Swal.fire({
        title: 'Algo de Errado!',
        text: 'Você não selecionou nenhuma transação',
        icon: 'question',
        confirmButtonText: 'Tentar Novamente'
      });
    }
  };

  const handleClose = () => { // Fecha o PopUp se clicar no X
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
            <h4>{`Ações da empresa:`}</h4>
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