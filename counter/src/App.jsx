import { useState } from 'react'
import './App.css'
import cross from './assets/cross.jpg'
import ProductCard from './components/ProductCard';
import Box from './components/Box';
import Counter from './components/Counter';

function App() {
  const [count, setCount] = useState(0)
  const name = "Chirag Nagpal";
  const age = 19;
  const flag = true;

  function greet(){
    return "Welcome";
  }

  const student = {
    name: "Chirag",
    age: 19
  };

  const arr = [1,2,3,4,5];

  const fruits = ['apple', 'banana', 'orange', 'kivi', 'watermolen', 'mango'];

  const url = "https://google.com"

  const productsdetails = [
    {name: "Samsung Galaxy", description: "Mobile", price: 40000},
    {name: "Iphone", description: "Mobile", price: 80000}
  ]

  return (
    <>
    {/* All element in react has self closing tag */}
    {/* <h1>{greet()}</h1>
      <h1>Chitkara University</h1>
      <p>JSX allow html to use in javascript</p>
      <h1>G1</h1> */}
      {/* use {} bracket to add js in the html */}
      {/* <p>Name: {name.toUpperCase()}</p>
      <p>Age: {age}</p> */}
      {/* All properties must in camelCase */}
      {/* <label htmlFor="name">Name:</label>
      <input type="text" placeholder='Enter name' maxLength={5} style={{width:"250px", margin:"auto"}} />
      <p className='ab'>Hello World</p>
      <p>{flag ? "Chirag" : "Nagpal"}</p>
      <p>{student.name + student.age}</p>
      <p>{arr.join('-')}</p>
      <p style={{color: "red", fontSize: "25px"}}>G1 student</p>
      <img src={cross} style={{height: "50px", width: "50px", margin: "10px ", border: "2px solid black", borderRadius: "50%"}} />
      <a href={url}>Google</a> */}
      {/* Simple implementation of array */}
      {/* <ul style={{margin:"auto"}}>
        <li>{fruits[0]}</li>
        <li>{fruits[1]}</li>
        <li>{fruits[2]}</li>
        <li>{fruits[3]}</li>
        <li>{fruits[4]}</li>
      </ul>
      <br /> */}
      {/* Array tranversal using map */}
      {/* <ul style={{margin:"auto"}}>
        {fruits.map((fruit, index) => {
          return <li key={index}>{fruit}</li>
        })}
      </ul>
      <br />
      <ProductCard name="Samsung" description="Samsung is the best phone" price={50000} available={true} />
      <br />
      <ProductCard name="Iphone" description="Iphone is the best phone" price={90000} available={false}/> */}
    {/* <Box /> */}
    <Counter />                      
    </>
  )
}

export default App
