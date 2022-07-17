import React from 'react'
import { useEffect, useContext } from 'react';
import AvailableStocks from '../components/AvailableStocks';
import StockMarket from '../components/StockMarket';
import ExpContext from '../context/ExpContext';
import './Home.css';

export default function Home () {

  const {
    getData,
    marketPopup,
    } = useContext(ExpContext);



  useEffect(() => {
    getData();
  }, []);


  

  return (
    <div id='home'>
      { marketPopup && <StockMarket /> }
      <AvailableStocks />
    </div>
  )
}
