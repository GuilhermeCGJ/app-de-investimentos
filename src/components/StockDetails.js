import React, { useContext } from 'react'
import ExpContext from '../context/ExpContext';

export default function StockDetails (props) {
  const { stockCode, stockName,
    stockValue, stockAmount, has } = props;

  const {
    setMarketPopup, setMarketStock
    } = useContext(ExpContext);

  const handleClick = () => {
    setMarketStock({
      code: stockCode,
      name: stockName,
      amount: 1,
      value: stockValue,
      has: has,
    });
    setMarketPopup(true);
  };

  return (
    <div className='infos'>
      <div className='info-box code-box'> 
        <p> {stockCode} </p>
      </div>
      <div className='info-box amount-box'> 
        <p> { stockAmount } </p>
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
