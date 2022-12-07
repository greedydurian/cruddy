import React, {useState} from 'react'
import { Button } from "@material-tailwind/react";
import Axios from "axios";
import QRCode from "qrcode.react";



const Cardinfo = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [qrCodeData, setQrCodeData] = useState(null);
  
  
// get card details
  const getDetails = () => {
    Axios.get("http://localhost:5000/api/details").then((response) => {
    setUserDetails(response.data);
    console.log(response)})}

//on click generate these and send to db
const getCard = async () => {
        Axios.post("http://localhost:5000/api/createcard" , {
            name:name,
            email:email,
         
            
        }).then(() => {console.log('success')})}
    

  return (
    
    <div className="bg-blue-500 text-white p-4">
       <h1>Cardinfo</h1>
      <Button className='border-2 border-rose-600' onClick={getDetails}>View Submitted details</Button>
      
      {userDetails.map((value, key)=>{
        return (
         
          <div className="employee" key={key}>
            
              <div>
                <br></br>
                  <input className='border-gray-400 rounded p-2'
                    type="radio"
                    name="userDetails"
                    value={`${value.email},${value.name}`}
                    onChange={(event) => {
                      const [selectedEmail, selectedName] = event.target.value.split(',');
                      setEmail(selectedEmail);
                      setName(selectedName);
                  }}
                    />
                 
                     Email: {value.email} 
                     <br></br>
                     Name: {value.name}
             
                
              </div> 
              </div>)
      })}
         <br></br>
          <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={getCard}>test</button>
          <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => setQrCodeData(name)}>Generate QR code</button>
         
          {qrCodeData && (
            <QRCode value={qrCodeData} />)}
            
        
            {email && <p>Selected email: {email}</p>}
                {name && <p>Selected name: {name}</p>}
              
    </div>
  )
}

export default Cardinfo;