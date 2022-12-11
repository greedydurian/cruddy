import React, {useState} from 'react'
import { Button } from "@material-tailwind/react";
import Axios from "axios";
import QRCode from "qrcode.react";



const Cardinfo = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showForm, setShowForm] = useState(false);

// for form
  const [cardName, setCardName] = useState([]);
  const [company, setCompany]= useState([]);
  const [year, setYear] =useState([]);
  const [type, setType] =useState([]);
  const [edition, setEdition]= useState([])

  
//on click generate these and send to db
  const getCard = async () => {
  return Axios.post("http://localhost:5000/api/createcard" , {
      name:name,
      email:email,   
  }).then(() => {
      console.log('success');
  });
};
  
 
// get card details
  const getDetails = () => {
    Axios.get("http://localhost:5000/api/details").then((response) => {
    setUserDetails(response.data);
    console.log(response);})}
  

  const getallCardDetails = async () => {
      return Axios.post("http://localhost:5000/api/inputCardDetails" , {
      name:name,
      email:email,
      cardName:cardName,
      company:company,
      year:year,
      type:type,
      edition:edition, 
      }).then(() => {
          console.log('success');
      }).catch((error) => {
          // handle the error here
      });
    };

  return (
    
    <div className="bg-white text-white p-4">
       <h1 className="text-2xl font-bold">Cardinfo</h1>
      <Button className='bg-white text-black border-2 border-rose-600' onClick={getDetails}>View Submitted details</Button>
      <div className="mt-4">

        {userDetails.length > 0 && userDetails.map((value, key)=>{
        return (
        
          <div className="flex mt-2 w-full" key={key}>
            <br></br>
            <input className="mr-2"
                    type="radio"
                    name="userDetails"
                    value={`${value.email},${value.name}`}
                    onChange={(event) => {
                      const [selectedEmail, selectedName] = event.target.value.split(',');
                      setEmail(selectedEmail);
                      setName(selectedName);
                      setShowForm(true);
                      
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
          
            <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={getCard} >Check details</button>
            <button className="bg-black text-white px-4 py-2 rounded-lg ml-4" onClick={() => setQrCodeData(name)}>Generate QR code</button>
         
            {qrCodeData && (
            <QRCode value={qrCodeData} className="mt-4"/>)}
          
        
              {email && <p className="mt-4 text-black font-semibold">Selected email: {email}</p>}
              {name && <p className="mt-4 text-black font-semibold">Selected name: {name}</p>}


              {showForm && (
              <form className="mt-4 text-black font-semibold"> 
              <h1 className='font-weight-bold mb-4'>Form</h1>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Card Name
                  <input type="text" placeholder="Card Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event) => {setCardName(event.target.value)}}/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">Company
                  <input type="text" placeholder="Company" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event) => {setCompany(event.target.value)}}/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">Year
                  <input type="text" placeholder="Year" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event) => {setYear(event.target.value)}}/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">Type
                  <input type="text" placeholder="Type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event) => {setType(event.target.value)}}/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">Edition
                  <input type="text" placeholder="Edition" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event) => {setEdition(event.target.value)}}/>
                </label>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg ml-4" onClick={getallCardDetails}>Submit details</button>
              </form>)}
          </div>   
    </div>
  )
}

export default Cardinfo;