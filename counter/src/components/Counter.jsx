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

    const product = [
    { name: "Laptop", price: 75000, category: "electronics" },
    { name: "Headphones", price: 5000, category: "audio" },
    { name: "Keyboard", price: 3000, category: "accessories" },
    { name: "Smartwatch", price: 12000, category: "wearable" }
];

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
        {/* Chaining of filtet and then map */}
        {
            product.filter((prod) => prod.price >= 12000).map((prod) => {
                return <p>{prod.name}</p>
            })
        } 
    </>
  )
}

export default Counter