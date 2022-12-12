import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";
import Axios from "axios";

const Displaycard = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [type, setType] =useState('');


 
// get card details
  const DisplayAllCard = () => {
    Axios.get("http://localhost:5000/api/allCardDetails").then((response) => {
    setUserDetails(response.data);
    console.log(response);})}


  return (
    
    <div className="bg-gray-200 text-white p-4">
      <h1>test</h1>
      <Button className='bg-black text-white px-4 py-2 rounded-lg ml-4' onClick={DisplayAllCard}>View Submitted details</Button>
      <div className="mt-4">
      <h1 className="text-2xl text-black font-bold">Cardinfo</h1>
        {userDetails.length > 0 && userDetails.map((value, key)=>{
        return (
          
          <div className="flex mt-2 w-full" key={key}>
             
            <br></br>
            <input className="mr-2"
                    type="radio"
                    name="userDetails"
                    value={`${value.email},${value.name},${value.type}`}
                    onChange={(event) => {
                      const [selectedEmail, selectedName, selectedType] = event.target.value.split(',');
                      setEmail(selectedEmail);
                      setName(selectedName);
                      setType(selectedType);
                   
                      
                  }}/>
          <div className="text-left text-black border-2 border-black p-2 rounded w-full">      
            <p className="text-black font-semibold">Email: {value.email} </p>
            <p className="text-black font-semibold">Name: {value.name} </p>
          </div>
        </div>)
      })}
      </div>
         <br></br>
        
         <div className="mt-4"> 
        
              {email && <p className="mt-4 text-black font-semibold">Selected email: {email}</p>}
              {name && <p className="mt-4 text-black font-semibold">Selected name: {name}</p>}
              {type && <p className="mt-4 text-black font-semibold">Selected type: {type}</p>}
           
          </div>   
    </div>
  )
}

export default Displaycard;