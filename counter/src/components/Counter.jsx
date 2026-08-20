import React, { useState } from 'react'

function Counter() {

    const [count, setCount] = useState(0);
    const [name, setName] = useState("Aman");
    const [fruit,setFruit] = useState(['apple','banana','mango']);

    function handleClick(){
        setCount(count + 1);
    }

    const handleName = () => {
        setName(name == "Aman" ? "Chirag" : "Aman");
    }

    function handleFruit(){
        setFruit([...fruit,"orange"]);
    }

  return (
    <>
        <h1>{count}</h1>
        <h2>{name}</h2>
        <button onClick={handleClick} style={{width:"100px", marginLeft:"45%", }}>Click</button>
        <br />
        <button onClick={handleName} style={{width:"100px", marginLeft:"45%"}}>Change</button>
        <ul>
        {fruit.map((fruit, index) => {
            return <li key={index}>{fruit}</li>
        })}
        </ul>
        <button onClick={handleFruit} style={{width:"100px", marginLeft:"45%"}}>Add Fruits</button>

        
    </>
  )
}

export default Counter