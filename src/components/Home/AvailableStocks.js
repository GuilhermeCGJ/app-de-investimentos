import React from 'react'
import StockDetails from './StockDetails'
import ExpContext from '../../context/ExpContext';
import { useContext } from 'react';

export default function AvailableStocks () {
  const {
    data,
    } = useContext(ExpContext);

    return data.map((data, index) => {
      return (
        <StockDetails
          key={ index }
          index={ index }
          stockCode={ data.code }
          stockAmount={ data.amount}
          stockName={ data.name }
          stockValue={ data.value }
          has={ false }
        />
      );
    });
  };
