import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import ExpContext from '../context/ExpContext';
import { TiArrowBack } from 'react-icons/ti';
import logo from '../components/Assets/ExpLogo.png';
import { useNavigate  } from 'react-router-dom';
import './UserArea.css';
import Header from '../components/All Pages/Header';

export default function UserArea () {
  const navigate = useNavigate ();
  const [ investedValue, setInvestedValue ] = useState(0);
  const {
    user,
    myStocks,
  } = useContext(ExpContext);

  

  useEffect(() => {
    const allInvestiments = myStocks.map((e) => parseFloat(e.value) * parseFloat(e.amount));
    setInvestedValue(allInvestiments);
  }, []);

  const handleQuit = () => {
    navigate("../", { replace: true })
  };

  const handleReturn = () => {
    navigate("../home", { replace: true })
  }; 

  return (
    <div id='user-area'>
      <Header />
      <TiArrowBack
          className="return-icon"
          size={50}
          color="#2C3333"
          onClick= { handleReturn }
        />
      <img src={logo} alt="logo" />
      <div className="user-area-box">
        <div className="user-area-infos">
          <h3>{`Usuário: ${user.email}`}</h3>
          <h3>{`Último Login: ${user.lastAcess}`}</h3>
          <h3>{`Saldo: R$ ${user.money}`}</h3>
          <h3>{`Total Investido: R$ ${parseFloat(investedValue).toFixed(2)}`}</h3>
        </div>
        <button
          type="Button"
          className="logout-button"
          onClick={ handleQuit }
        >
          Logout
        </button>
      </div>
    </div>
  )
}