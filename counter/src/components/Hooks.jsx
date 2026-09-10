import React, { useState, useEffect, useRef } from 'react'

function Hooks() {

    const[count, setCount] = useState(0);
    const[products, setProducts] = useState([]);
    const[limit, setLimit] = useState(10);

    const renderCount = useRef(0);
    renderCount.current++;

    const inputRef = useRef();

    function handleInc(){
        setCount(count + 1);
    }
    function handleDec(){
        setCount(count - 1);
    }

    function handleClick(){
        console.log(inputRef.current.value);
    }

    const url = "https://dummyjson.com/Products?limit=${limit}"

    useEffect(() => {
        fetch("https://dummyjson.com/Products").then(
        (response) => response.json()).then(
            (data) => setProducts(data.products))
    },[])

  return (
    <>
        <h1>Count: {count}</h1>
        <button onClick={handleInc} style={{margin:"10px"}}>Increment</button>
        <button onClick={handleDec} style={{margin:"10px"}}>Decrement</button>
        <h2>Render Count: {renderCount.current}</h2> 
        <ul>
            {products.map((product) =>{
                return <li key={product.id}>{product.title}</li>
            })}
        </ul>
        <input ref={inputRef} type="text" placeholder='Enter text...' style={{margin:"10px"}}/>
        <button onClick={handleClick} style={{margin:"10px"}}>Click Me</button>
    </>
  )
}

export default Hooks