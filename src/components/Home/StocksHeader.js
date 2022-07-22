import React from 'react';

export default function StocksHeader () {


  return (
    <div className='stocks-header'>
      <div className='info-box code-box bg-gray text-box'> 
        <p> Código </p>
      </div>
      <div className='info-box amount-box bg-gray text-box'> 
        <p> Qtde </p>
      </div>
      <div className='info-box value-box bg-gray text-box'> 
        <p> Valor (R$) </p>
      </div>
      <div className='info-box trade-box bg-gray text-box'> 
        <p> Negociar </p>
      </div>
    </div>
  )
}