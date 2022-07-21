import React from 'react';
import { useNavigate  } from 'react-router-dom';
import logo from './ExpLogo.png';
import { FaUserAlt } from 'react-icons/fa';
import './Header.css'

export default function Header () {
  const navigate = useNavigate ();
  const handleProfile = () => {
    navigate("../profile", { replace: true })
  };

  return (
    <div id='header'>
      <div className='header'>
        <img src={logo} alt="logo" className="header-logo" />
        <FaUserAlt onClick={handleProfile} />
      </div>
    </div>
  )
}