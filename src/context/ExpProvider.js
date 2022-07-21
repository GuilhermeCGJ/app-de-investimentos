import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpContext from './ExpContext';

function ExpProvider({ children }) {
  const [data, setData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  const [marketPopup, setMarketPopup] = useState(false);
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

  const handleBuy = (value) => {
    if (marketStock.has) {
      const index = myStocks.map(object => object.code).indexOf(marketStock.code);
      let newValue = myStocks;
      let newAmount = parseFloat(newValue[index].amount) + parseFloat(value);
      newValue[index] = {
        code: marketStock.code,
        name: marketStock.name,
        amount: newAmount,
        value: marketStock.value,
        has: marketStock.has
      };
      setMyStocks(newValue);
    } else {
      let newAmount = parseFloat(value);
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
    let newAmount = parseFloat(marketStock.amount) - parseFloat(value);
        if (marketStock.has) {
          const index = myStocks.map(object => object.code).indexOf(marketStock.code);
          let newValue = myStocks;
          newValue[index] = {
            code: marketStock.code,
            name: marketStock.name,
            amount: newAmount,
            value: marketStock.value,
            has: marketStock.has
          };
          setMyStocks(newValue);
        } else {
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
        setMarketStock({
          code: marketStock.code,
          name: marketStock.name,
          amount: newAmount,
          value: marketStock.value,
          has: true,
        })
  }

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
