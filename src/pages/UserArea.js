import React from 'react';
import { useContext } from 'react';
import ExpContext from '../context/ExpContext';
import { TiArrowBack } from 'react-icons/ti';
import logo from '../components/ExpLogo.png';
import { useNavigate  } from 'react-router-dom';

export default function UserArea () {
  const navigate = useNavigate ();
  const {
    user,
  } = useContext(ExpContext);

  const handleQuit = () => {
    navigate("../", { replace: true })
  };

  const handleReturn = () => {
    navigate("../home", { replace: true })
  }; 

  return (
    <div id='user-area'>
      <TiArrowBack
          className="return-icon"
          size={50}
          color="#E7F6F2"
          onClick= { handleReturn }
        />
      <img src={logo} alt="logo" />
      <div className="user-box">
        <div className="user-infos">
          <h3>{`Usuário: ${user.email}`}</h3>
          <h3>{`Último Login: ${user.email}`}</h3>
          <h3>{`Saldo: ${user.money}`}</h3>
        </div>
        <button
          type="Button"
          onClick={ handleQuit }
        >
          Logout
        </button>
      </div>
    </div>
  )
}