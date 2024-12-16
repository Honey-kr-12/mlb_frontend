import React from 'react'
// import {  ChromeFilled } from '@ant-design/icons'/
import Ship from '../../utils/logo.png'

const Logo = () => {
  return (
    <div className='logo'>
      <div className="logo-icon">
      <img src={Ship} alt="" width={50} height={50} style={{border:'2px solid #ddd', borderRadius:'20%'}} />
      </div>
    </div>
  )
}

export default Logo
