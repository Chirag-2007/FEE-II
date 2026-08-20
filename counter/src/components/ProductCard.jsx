import React from 'react'

function ProductCard(props) {
  return (
    <>
        <div style={{border:"2px solid white", width:"400px", height:"170px", padding:"10px", margin:"auto"}}>
            <h2>Product Name: {props.name}</h2>
            <p>Product Description: {props.description}</p>
            <p>Price: {props.price}</p>
            <p>Available: {props.available ? "True" : "False"}</p>
            <button>Add to Cart</button>
            <br />
            <button>Buy Now</button>
        </div>
    </>
  )
}

export default ProductCard