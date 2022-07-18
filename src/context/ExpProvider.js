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
  

  const getData=()=>{
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
