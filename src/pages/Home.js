import React from 'react'
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailableStocksArea from '../components/AvailableStocksArea';
import MyStocksArea from '../components/MyStocksArea';
import StocksMarket from '../components/StocksMarket';
import StocksHeader from '../components/StocksHeader';
import ExpContext from '../context/ExpContext';
import './Home.css';

export default function Home () {

  const navigate = useNavigate ();
  const {
    getData,
    marketPopup,
    myStocks,
    } = useContext(ExpContext);



  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    navigate("../transactions", { replace: true })
  };
  

  return (
    <div id='home'>
      { marketPopup && <StocksMarket /> }
      <div className='stocks-view-area'>
        <div className='title'>
          <h5>Minhas Ações</h5>
        </div>
        
        { myStocks.length > 0 ? <><StocksHeader /> <MyStocksArea /></> : <div className='stocks-area'><h3> Você não tem ações </h3></div >}
        
        <div className='title'>
          <h5>Disponíveis para investir</h5>
        </div>
        <StocksHeader />
        <AvailableStocksArea />
      </div>
      <button
        className='home-button'
        onClick= { handleClick }
      >
        Depósito/Retirada
      </button>
    </div>
  )
}
