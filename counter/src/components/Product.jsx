import React, { useState } from 'react'

function Product(props) {
    // count -> variable, setCount -> function help to change the state
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(props.price);

    const purchase = () => {
        alert("Order Placed");
    }

  return (
    <div style={{border:"2px solid white", height:"150px", width:"200px", padding:"10px", borderRadius:"5px"}}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>Price: {price}</p>
        <button onClick={purchase} style={{width:"100px", padding:"3px", marginBottom:"5px"}}>
            Buy Now
        </button>
        <br />
        <button onClick={() => setPrice(price + 10000)} style={{width:"100px", padding:"3px"}}>
            Add To Cart
        </button>
    </div>
  )
}

export default Product