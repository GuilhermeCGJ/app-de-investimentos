import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpContext from './ExpContext';

function ExpProvider({ children }) {
  const [data, setData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  const [marketPopup, setMarketPopup] = useState(false);
  const [toBuy, setToBuy] = useState(0);
  const [invested, setInvested] = useState({
    value: 0,
    amount: 0,
  });
  const [marketStock, setMarketStock] = useState({
    code: '',
    name: '',
    amount: 0,
    value: 0,
    has: false,
  });
  const [user, setUser] = useState({
    email: '',
    lastAcess:'',
    money: 0,
    stocks: [],
  });
  

  const getData = () => {
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

  const storedInfos = () => {
    const stored = localStorage.getItem("users");
    const response = JSON.parse(stored);
    if ( response ) {
      const date = new Date();
      const now = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - 
        ${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
      setUser({
        email: response.email,
        lastAcess: now,
        money: response.money,
        stocks: response.stocks,
      });
      if ( typeof response.stocks ==! "array")
      setMyStocks([response.stocks]);
    } else {
      localStorage.setItem("users",JSON.stringify(user));
    }
  };

  const updateLocalStorage = () => {
    const stored = localStorage.getItem("users");
    const response = JSON.parse(stored);
    if ( response ) {
    localStorage.setItem("users",JSON.stringify(user));
    };
  };

  const updateInvestValue = () => {
    const hasThisStock = myStocks.map(object => object.code).some(val => val === marketStock.code);
    if ( hasThisStock ) {
      const index = myStocks.map(object => object.code).indexOf(marketStock.code);
      let newValue = myStocks;
      const newAmount = parseFloat(newValue[index].amount);
      newValue[index] = {
        code: marketStock.code,
        name: marketStock.name,
        amount: marketStock.amount,
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

  const updateAvailableAmount = () => {
    const index = data.map(object => object.code).indexOf(marketStock.code);
    let newAmount = data;
    setToBuy(newAmount[index].amount);
    console.log(toBuy)
  };

  const handleBuy = (value) => {
    if (marketStock.has) {
      const index = myStocks.map(object => object.code).indexOf(marketStock.code);
      let newValue = myStocks;
      const newAmount = parseFloat(newValue[index].amount) + parseFloat(value);
      newValue[index] = {
        code: marketStock.code,
        name: marketStock.name,
        amount: newAmount,
        value: marketStock.value,
        has: marketStock.has
      };
      setMyStocks(newValue);
    } else {
      const newAmount = parseFloat(value);
      if (myStocks) {
        let newStocks = myStocks;
        newStocks.push({
          code: marketStock.code,
          name: marketStock.name,
          amount: newAmount,
          value: marketStock.value,
          has: true,
        })
        setMyStocks(newStocks);
      } else {
        setMyStocks({
          code: marketStock.code,
          name: marketStock.name,
          amount: newAmount,
          value: marketStock.value,
          has: true,
        })
      }
    }
    let newAmount = parseFloat(marketStock.amount) - parseFloat(value);
    setMarketStock({
      code: marketStock.code,
      name: marketStock.name,
      amount: newAmount,
      value: marketStock.value,
      has: true,
    })
  }

  const handleSell = (value) => {
    const newAmount = parseFloat(invested.amount) - parseFloat(value);
    const index = myStocks.map(object => object.code).indexOf(marketStock.code);
    if (newAmount === 0) {
      myStocks.splice(index, 1);
    } else {
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
    const profit = (parseFloat(marketStock.value) * parseFloat(value)) + parseFloat(user.money);
    setUser({
      email: user.email,
      lastAcess: user.lastAcess,
      money: profit,
      stocks: user.stocks,
    });
  };

  const deleteInData = () => {
    let newData = data;
    newData = newData.filter(dataValue => {
      return !myStocks.find((myStockValue)=>{
        return dataValue.code === myStockValue.code
      }) 
     });
    setData(newData);
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
        deleteInData,
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

ExpProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExpProvider;
