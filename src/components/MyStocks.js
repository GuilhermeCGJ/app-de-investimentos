import React from 'react'
import { useContext } from 'react';
import StockDetails from './StockDetails';
import ExpContext from '../context/ExpContext';

export default function MyStocks () {
  const {
    myStocks,
    } = useContext(ExpContext);

    return myStocks.map((data, index) => {
      return (
        <StockDetails
          key={ index }
          index={ index }
          stockCode={ data.code }
          stockName={ data.name }
          stockAmount={ data.amount }
          stockValue={ data.value }
          has={ false }
        />
      );
    });
}