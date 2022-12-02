import React from 'react'
import './FirstPage.css'
import Treasure from '../../assets/treasure.svg';

function FirstPage() {
  return (
    <div className='hero'>
    <div className='fill'>
    <img src={Treasure} alt="poster" className="intro_image" />
    </div>
    <div className="content">
      <input type="text" className='textbox' placeholder='Enter the clue here to continue...'/>
      <input type="submit" className='button'/>
      
      <span className='solve'>Solve the Crossword to Continue</span>
    <a href="#">Click Me....Find the Clue and Come Back</a>
    </div>

  </div>
  )
}

export default FirstPage