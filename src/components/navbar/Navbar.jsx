import React from 'react'
import Timer from '../timer/Timer';
import './Navbar.css';


function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar_inside'>
            <div className="logo"><span>Trace</span></div>
            <div className='timer'><span><Timer/></span></div>
        </div>
    </div>
  )
}

export default Navbar