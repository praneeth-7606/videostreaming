import React from 'react'

function Footer() {
  return (
    <div className='bg-dark  footer text-light text-align-center'>
      <h1 className='text-center'>hi hello welcome to footer page</h1>
      <h4 className='text-center'> All Rights reserved  &copy; techcompany</h4>
      <div className=' text-center '>
        <a href="/contact" style={{textDecoration:"none",paddingRight:".5%"}}>Contactus</a>
        {/* <br></br> */}
        <a href="/about" style={{textDecoration:"none",paddingRight:"0.5%"}}>About us</a>
        <a href="/pl" style={{textDecoration:"none",paddingRight:"0.5%"}}>policies</a>
      </div>
    </div>
  )
}

export default Footer
