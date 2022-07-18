import React from 'react'
import { useEffect, useContext } from 'react';
import AvailableStocksArea from '../components/AvailableStocksArea';
import MyStocksArea from '../components/MyStocksArea';
import StockMarket from '../components/StockMarket';
import StocksHeader from '../components/StocksHeader';
import ExpContext from '../context/ExpContext';
import './Home.css';

export default function Home () {

  const {
    getData,
    marketPopup,
    myStocks,
    } = useContext(ExpContext);



  useEffect(() => {
    getData();
  }, []);


  

  return (
    <div id='home'>
      { marketPopup && <StockMarket /> }
      <div className='stocks-view-area'>
        <div className='title'>
          <h5>Minhas Ações</h5>
        </div>
        { myStocks.length > 0 ? <MyStocksArea /> : <div className='stocks-area'><h3> Você não tem ações </h3></div >}
        
        <div className='title'>
          <h5>Disponíveis para investir</h5>
        </div>
        <StocksHeader />
        <AvailableStocksArea />
      </div>
      <button className='home-button'>
        Depósito/Retirada
      </button>
    </div>
  )
}
