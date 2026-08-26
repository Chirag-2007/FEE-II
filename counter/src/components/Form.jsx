import React, { useState } from 'react'

function Form() {

    const[name,setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [formData, setFormData] = useState([])

    function handleChange(e){
        setName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleName(){
        console.log(name + " " + lastName);
    }

  return (
    <>
        <input type="text" placeholder='Enter FirstName....' style={{width:"300px", padding:"3px", margin:"10px"}} onChange={handleChange} value={name} />

        <input type="text" placeholder='Enter LastName....' style={{width:"300px", padding:"3px", margin:"10px"}} onChange={handleLastName} value={lastName} />

        <button style={{width:"120px", marginLeft:"10px"}} onClick={handleName}>
            Change Name
        </button>

        <p>
            {name + " " + lastName}
        </p>
    </>
  )
}

export default Form

// input ma kuch bhi changes hone to onChange event listener trigger hoga and vo handleChange function to handle karega.

// Code pahale chalta h, then UI ma state render hota h.
// -> ise liya 1 delay aata h value ma
// state change hone se pahale code run ho raha h.
// -> Solution: 
// const name = e.target.value;
// setName(name);