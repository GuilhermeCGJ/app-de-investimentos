import React, { useContext } from 'react'
import ExpContext from '../context/ExpContext';
import './StockDetails.css'

export default function StockDetails (props) {
  const { stockCode,
    stockValue, has } = props;

  const {
    setMarketPopup,
    } = useContext(ExpContext);

  const handleClick = () => {
    setMarketPopup(true);
  };

  return (
    <div className='infos'>
      <div className='info-box code-box'> 
        <p> {stockCode} </p>
      </div>
      <div className='info-box amount-box'> 
        <p> 1 </p>
      </div>
      <div className='info-box value-box'> 
        <p> {stockValue} </p>
      </div>
      <div
        className='info-box trade-box'
        onClick={handleClick}
      > 
        <img src='../../public/icons/buy.svg' alt='buy icon' />
        <img src={ has ? '../../public/icons/sell.svg' : '../../public/icons/graySell.svg'} alt='sell icon' />
      </div>
    </div>
  )
}
