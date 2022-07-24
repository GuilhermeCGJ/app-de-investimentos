import React from 'react'
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailableStocksArea from '../components/Home/AvailableStocksArea';
import MyStocksArea from '../components/Home/MyStocksArea';
import StocksMarket from '../components/Home/StocksMarket';
import StocksHeader from '../components/Home/StocksHeader';
import ExpContext from '../context/ExpContext';
import './Home.css';
import Header from '../components/All Pages/Header';

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
    getData(); // Trás as informações da API para o estado local
    storedInfos(); // Verifica as informações de usuário salvas no Local Storage
  }, []);

  useEffect(() => {
    updateLocalStorage(); // Atualiza os dados no local storage
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
          <div className='title text-box'>
            <h5>Minhas Ações</h5>
          </div>
          {/* Caso tenha ações na carteira, renderiza elas, caso não, mostra mensagem */}
          { myStocks.length > 0 ? <><StocksHeader /> <MyStocksArea /></> : <div className='stocks-area'><h3> Você não tem ações </h3></div >}
        </div>
       <div className="available-stocks-area">
          <div className='title  text-box'>
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
