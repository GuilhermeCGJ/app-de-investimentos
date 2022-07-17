import React from 'react'
import './StockDetails.css'

export default function StockDetails (props) {
  const { stockCode,
    stockValue, has } = props;

  return (
    <div className='stock-details'>
      <div className='code-box'> 
        <p> {stockCode} </p>
      </div>
      <div className='value-box'> 
        <p> {stockValue} </p>
      </div>
      <div className='trade-box'> 
        <img src='../../public/icons/buy.svg' alt='buy icon' />
        <img src={ has ? '../../public/icons/sell.svg' : '../../public/icons/graySell.svg'} alt='sell icon' />
      </div>
    </div>
  )
}
