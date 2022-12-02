import React from 'react'
import FirstPage from '../firstPage/FirstPage'
import Navbar from '../navbar/Navbar'
import SecondPage from '../secondPage/SecondPage'
import Sudoku from '../sudoku/Sudoku'


function Home() {
  return (
    <div>
        <Navbar/>
        {/* <FirstPage/> */}
        {/* <SecondPage/> */}
        <Sudoku/>
    </div>
  )
}

export default Home