import React from 'react'
import Product from './Product'

function Box() {

  return (
    <>
    <h1 style={{alignContent:"center"}}>Mobile Phones</h1>
        <div style={{padding:"10px", margin:"10px", display:"flex", justifyContent:"space-between", gap:"20px", flexWrap:"wrap"}}>
            <Product name="Samsung" description="Samsung is the best phone" price={45000} />
            <Product name="Vivo" description="Vivo is the best phone" price={16000} />
            <Product name="Redmi" description="Redmi is the best phone" price={50000} />
            <Product name="Realme" description="Realme is the best phone" price={80000} />
            <Product name="Infinix" description="Infinix is the best phone" price={70000} />
            <Product name="Huwai" description="Huawai is the best phone" price={10000} />
            <Product name="Iphone" description="Iphone is the best phone" price={80000} />
            <Product name="Oppo" description="Oppo is the best phone" price={60000} />
            <Product name="IQOO" description="IQOO is the best phone" price={30000} />
        </div>
    </>
  )
}

export default Box