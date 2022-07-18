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
    stocks: [],
  })
  

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

  const handleBuy = (value) => {
    let newAmount = parseFloat(marketStock.amount) + parseFloat(value);
        console.log(newAmount);
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
