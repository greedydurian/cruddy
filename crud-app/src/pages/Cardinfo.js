import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";
import Axios from "axios";
import QRCode from "qrcode.react";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';


const Cardinfo = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);

// for form
  const [cardName, setCardName] = useState([]);
  const [company, setCompany]= useState([]);
  const [year, setYear] =useState([]);
  const [type, setType] =useState([]);
  const [edition, setEdition]= useState([])

  const [open, setOpen] =useState(false)
  const [uuid, setUuid]= useState(uuidv4());

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setOpen(true);
    
  };

  const handleClose = (event) => {
    setOpen(false);
    event.preventDefault();
  };

 

  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodename')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

//on click generate these and send to db
  const getCard = async () => {
  return Axios.post("http://localhost:5000/api/createcard" , {
      name:name,
      email:email,   
  }).then(() => {
      console.log('success');
  });
};

function handleUuid() {
  const newUuid = uuidv4();
  setUuid(newUuid);
}  
 
// get card details
  const getDetails = () => {
    Axios.get("http://localhost:5000/api/details").then((response) => {
    setUserDetails(response.data);
    console.log(response);})}
  

  const getallCardDetails = async (event) => {
      event.preventDefault();
      return Axios.post("http://localhost:5000/api/inputCardDetails" , {
      name:name,
      email:email,
      cardName:cardName,
      company:company,
      year:year,
      type:type,
      edition:edition, 
      uuid:uuid,
      
      }).then(() => {
          console.log('success');
          
          setOpen(true);
          
      }).catch((error) => {
          // handle the error here
      });
    };


  return (
    
    <div className="bg-gray-200 text-white p-4">
      
      <Button className='bg-black text-white px-4 py-2 rounded-lg ml-4' onClick={getDetails}>View Submitted details</Button>
      <div className="mt-4">
      <h1 className="text-2xl text-black font-bold">Cardinfo</h1>
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

              {email && <p className="mt-4 text-black font-semibold">Selected email: {email}</p>}
              {name && <p className="mt-4 text-black font-semibold">Selected name: {name}</p>}
             


            {showForm && (
              
              <form className="mt-4 text-black font-semibold" onSubmit={handleSubmit}> 
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
                
                <br></br>
                <p>this is your uuid:{uuid}</p>
                <div>
                <button className="bg-black text-white px-4 py-2 rounded-lg ml-4" onClick={handleUuid}>Generate UUID and QR code</button>
                {uuid && <QRCode id='qrCodename' value={uuid} className="mt-4"/>}
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={downloadQRCode}>Download QR Code</button>

                <button className="bg-black text-white px-4 py-2 rounded-lg ml-4" onClick={getallCardDetails}>Submit details</button>
              </form>

              
              )}
               
              
               
         {/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Form Data</DialogTitle>
                  <DialogContent>
                    <p>test</p>
                </DialogContent>
                <Button onClick={handleClose}>Close</Button>
              </Dialog> */}
          </div>   
    </div>
  )
}

export default Cardinfo;