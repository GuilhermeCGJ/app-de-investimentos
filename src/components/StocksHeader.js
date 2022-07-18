import React from 'react'

export default function StocksHeader () {


  return (
    <div className='stocks-header'>
      <div className='info-box code-box bg-gray'> 
        <p> Código </p>
      </div>
      <div className='info-box amount-box bg-gray'> 
        <p> Qtde </p>
      </div>
      <div className='info-box value-box bg-gray'> 
        <p> Valor (R$) </p>
      </div>
      <div className='info-box trade-box bg-gray'> 
        <p> Negociar </p>
      </div>
    </div>
  )
}