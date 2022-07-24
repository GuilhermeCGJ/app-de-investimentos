import React, { useState } from 'react';
import ExpContext from './ExpContext';

function ExpProvider({ children }) {
  const [data, setData] = useState([]); // Onde é salvo a informação das ações disponiveis que vem da api
  const [myStocks, setMyStocks] = useState([]); // É a carteira de ações do usuário
  const [marketPopup, setMarketPopup] = useState(false); // Estado que abre e fecha o popup do mercado de ações
  const [toBuy, setToBuy] = useState(0); // Valor atualizado de ações disponíveis para comprar
  const [invested, setInvested] = useState({
    value: 0, // Valor total investido em ações de uma empresa especifica
    amount: 0, // Quantidade de ações de uma empresa especifica
  });
  const [marketStock, setMarketStock] = useState({ // Ação selecionada para compra e venda no mercado
    code: '',
    name: '',
    amount: 0,
    value: 0,
    has: false,
  });
  const [user, setUser] = useState({ // Informações do usuário, também usado para simular informações em um banco de dados
    email: '',
    lastAcess:'',
    money: 0,
    stocks: [],
  });
  

  const getData = () => { // Trás as informações da API para o estado local
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  
  }

  const storedInfos = () => { // Verifica as informações de usuário salvas no Local Storage
    const stored = localStorage.getItem("users");
    const response = JSON.parse(stored);
    if ( response ) { // Se houver informações salvas, trás elas para o estado local
      const date = new Date();
      const now = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - 
        ${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
      setUser({
        email: response.email,
        lastAcess: now,
        money: response.money,
        stocks: response.stocks,
      });
    } else { // Se não houver informações salvas, salva um novo usuário local storage
      localStorage.setItem("users",JSON.stringify(user));
    }
  };

  const updateLocalStorage = () => { // Atualiza os dados no local storage
    const stored = localStorage.getItem("users");
    const response = JSON.parse(stored);
    if ( response ) {
    localStorage.setItem("users",JSON.stringify(user));
    };
  };

  const updateInvestValue = () => { // Calcula o valor investido em ações de uma empresa especifica
    const hasThisStock = myStocks.map(object => object.code).some(val => val === marketStock.code);
    if ( hasThisStock ) {
      const index = myStocks.map(object => object.code).indexOf(marketStock.code);
      let newValue = myStocks;
      const newAmount = parseFloat(newValue[index].amount);
      newValue[index] = {
        code: marketStock.code,
        name: marketStock.name,
        amount: newAmount,
        value: marketStock.value,
        has: true,
      };
      setMarketStock(newValue[index]);
      setInvested({
        value:parseFloat(newAmount) * parseFloat(marketStock.value),
        amount: newAmount,
      });
    } else {
      setInvested({
        value: 0,
        amount: 0,
      });
    }
  };

  const updateAvailableAmount = () => { // Atualiza quantidade de ações que tem disponiveis para comprar de uma empresa especifica
    const index = data.map(object => object.code).indexOf(marketStock.code);
    let newAmount = data;
    setToBuy(newAmount[index].amount);
    console.log(toBuy)
  };

  const handleBuy = (value) => { // Realiza a compra de uma ação
    if (marketStock.has) { // Se já tem ações dessa empresa na carteira
      const index = myStocks.map(object => object.code).indexOf(marketStock.code); // Localiza a empresa na carteira
      let newValue = myStocks;
      const newAmount = parseFloat(newValue[index].amount) + parseFloat(value);
      newValue[index] = {
        code: marketStock.code,
        name: marketStock.name,
        amount: newAmount,
        value: marketStock.value,
        has: marketStock.has
      };
      setMyStocks(newValue); // Salva a nova quantidade de ações na carteira
    } else { // Caso não tenha ações dessa empresa na carteira
      const newAmount = parseFloat(value);
      if (myStocks) { // Se já tem uma carteira
        let newStocks = myStocks;
        newStocks.push({
          code: marketStock.code,
          name: marketStock.name,
          amount: newAmount,
          value: marketStock.value,
          has: true,
        })
        setMyStocks(newStocks); // Salva nova empresa na carteira
      } else { // Se ainda não tem uma carteira de ações
        setMyStocks({ // Cria uma carteira de ações com o item recem comprado
          code: marketStock.code,
          name: marketStock.name,
          amount: newAmount,
          value: marketStock.value,
          has: true,
        })
      }
    }
    let newAmount = parseFloat(marketStock.amount) - parseFloat(value); // Valor de ações disponiveis agora é o valor que tinha antes, menos o valor comprado pelo usuário
    setMarketStock({
      code: marketStock.code,
      name: marketStock.name,
      amount: newAmount,
      value: marketStock.value,
      has: true,
    })
    const cost = parseFloat(user.money) -(parseFloat(marketStock.value) * parseFloat(value)); // Atualiza o valor total investido em ações na carteira do usuário
    setUser({
      email: user.email,
      lastAcess: user.lastAcess,
      money: cost,
      stocks: user.stocks,
    });
  }

  const handleSell = (value) => { // Realiza a compra de uma ação
    const newAmount = parseFloat(invested.amount) - parseFloat(value); // Quantas ações sobram na carteira do usuário
    const index = myStocks.map(object => object.code).indexOf(marketStock.code); // Localiza a empresa na carteira do usuário
    if (newAmount === 0) { // Se o novo valor for zero
      myStocks.splice(index, 1); // Deleta a empresa da carteira do usuário
    } else { // Se o valor for outro, apenas atualiza o valor
      const newValue = myStocks;
      newValue[index] = {
        code: marketStock.code,
        name: marketStock.name,
        amount: newAmount,
        value: marketStock.value,
        has: true,
      };
      setMyStocks(newValue);
    }
    const profit = (parseFloat(marketStock.value) * parseFloat(value)) + parseFloat(user.money); //Valor que ganhou com a venda de ações + o valor que já tinha na conta
    setUser({ // Atualiza saldo do usuario
      email: user.email,
      lastAcess: user.lastAcess,
      money: profit,
      stocks: user.stocks,
    });
  };

  return (
    <ExpContext.Provider
      value={ {
        data,
        setData,
        getData,
        marketStock,
        setMarketStock,
        myStocks,
        setMyStocks,
        marketPopup,
        setMarketPopup,
        user,
        setUser,
        handleBuy,
        handleSell,
        storedInfos,
        updateLocalStorage,
        invested,
        setInvested,
        updateInvestValue,
        updateAvailableAmount,
        toBuy,
        setToBuy,
      } }
    >
      {children}
    </ExpContext.Provider>
  );
}

export default ExpProvider;
