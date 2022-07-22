import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import ExpContext from '../../context/ExpContext';

export default function DepositAndWithdrawal () {
  const {
    setUser,
    user,
  } = useContext(ExpContext);

  const [choosed, setChoosed] = useState('');
  const [typedValue, setTypedValue] = useState({
    money: 0,
    error: '',
    hasError: false,
    wasTouched: false,
  });

  const handleChange = (e) => {
    const { value } = e.target;
    
    setTypedValue ({
      money: value,
      error: '',
      hasError: false,
      wasTouched: true,
    });
  }

  const handleChoose = (e) => {
    const { id } = e.target;
    console.log(id);
    setChoosed(id);
  };

  const validateWithdraw = () => {
    if ( parseFloat(typedValue.money) > parseFloat(user.money) ) {
      setTypedValue ({
        money: 0,
        error: 'Você não tem saldo suficiente',
        hasError: true,
        wasTouched: true,
      });
      return false;
    } else if ( parseFloat(typedValue.money) <= 0) {
      setTypedValue ({
        money: 0,
        error: 'Valor inválido',
        hasError: true,
        wasTouched: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const validateDeposit = () => {
    if ( parseFloat(typedValue.money) <= 0) {
      setTypedValue ({
        money: 0,
        error: 'Valor inválido',
        hasError: true,
        wasTouched: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleConfirm = () => {
    if (choosed === 'deposit') {
      const deposit = parseFloat(user.money) + parseFloat(typedValue.money);
      const approved = validateDeposit();
      if ( approved ) {
        setUser({
          email: user.email,
          lastAcess: user.lastAcess,
          money: deposit,
          stocks: user.stocks,
        });
        setTypedValue ({
          money:0,
          error: '',
          hasError: false,
          wasTouched: false,
        });
        setChoosed('');
      }
    } else if (choosed === 'withdrawal') {
      const withdrawal = parseFloat(user.money) - parseFloat(typedValue.money);
      const approved = validateWithdraw();
      if ( approved ) {
        setUser({
          email: user.email,
          lastAcess: user.lastAcess,
          money: withdrawal,
          stocks: user.stocks,
        });
        setTypedValue ({
          money:0,
          error: '',
          hasError: false,
          wasTouched: false,
        });
        setChoosed('');
      }
      
    }
    
  }

  return (
    <div id='deposit-and-withdrawal'>
      <div className="choose-transaction">
        <div className="deposit">
        <input
          type="radio"
          id="deposit"
          name="transaction"
          onClick={ handleChoose }
        />
        <label
          htmlFor="deposit"
          className="text-box"
        >
          Depositar
        </label>
        </div>
        <div className="withdrawal">
        <input
          type="radio"
          id="withdrawal"
          name="transaction"
          onClick={ handleChoose }
        />
        <label
          htmlFor="withdrawal"
          className="text-box"
        >
          Sacar
        </label>
        </div>
      </div>
      <fieldset className='money-wrapper'>
        <input
          type="number"
          name="money"
          value={typedValue.money}
          onChange= { handleChange }
        />
        <label htmlFor="money" className='money-input'>
          <p>R$ </p>
        </label>
      </fieldset>
      {typedValue.hasError && <small>{typedValue.error}</small>}
      <button
        type='button'
        className="confirm-button"
        onClick={ handleConfirm }
      >
        Confirmar
      </button>
    </div>
  )
}