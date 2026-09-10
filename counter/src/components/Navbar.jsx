import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
        <nav style={{display:'flex',justifyContent:"space-around", margin:"10px"}}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Product</Link>
            <Link to="/login">Login</Link>
        </nav>
    </>
  )
}

export default Navbar