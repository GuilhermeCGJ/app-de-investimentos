import React from 'react'
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailableStocksArea from '../components/AvailableStocksArea';
import MyStocksArea from '../components/MyStocksArea';
import StocksMarket from '../components/StocksMarket';
import StocksHeader from '../components/StocksHeader';
import ExpContext from '../context/ExpContext';
import './Home.css';
import Header from '../components/Header';

export default function Home () {

  const navigate = useNavigate ();
  const {
    getData,
    marketPopup,
    myStocks,
    storedInfos,
    user,
    setUser,
    updateLocalStorage,
    } = useContext(ExpContext);



  useEffect(() => {
    getData();
    storedInfos();
  }, []);

  useEffect(() => {
    updateLocalStorage();
  }, [user]);

  useEffect(() => {
    setUser({
      email: user.email,
      lastAcess: user.lastAcess,
      money: user.money,
      stocks: myStocks,
    });
  }, [marketPopup]);

  const handleClick = () => {
    navigate("../transactions", { replace: true })
  };
  

  return (
    <div id='home'>
      <Header />
      { marketPopup && <StocksMarket /> }
      <div className='stocks-view-area'>
        <div className="my-stocks-area">
          <div className='title'>
            <h5>Minhas Ações</h5>
          </div>
          
          { myStocks.length > 0 ? <><StocksHeader /> <MyStocksArea /></> : <div className='stocks-area'><h3> Você não tem ações </h3></div >}
        </div>
       <div className="available-stocks-area">
          <div className='title'>
            <h5>Disponíveis para investir</h5>
          </div>
          <StocksHeader />
          <AvailableStocksArea />
       </div>

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
