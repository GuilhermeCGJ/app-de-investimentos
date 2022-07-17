import React from 'react'
import { useEffect, useContext } from 'react';
import AvailableStocks from '../components/AvailableStocks';
import ExpContext from '../context/ExpContext';

export default function Home () {

  const {
    getData,
    } = useContext(ExpContext);



  useEffect(() => {
    getData();
  }, []);


  

  return (
    <div id='Home'>
      <AvailableStocks />
    </div>
  )
}
