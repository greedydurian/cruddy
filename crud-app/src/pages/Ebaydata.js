import React, { useState } from 'react';
import axios from 'axios';
import { Checkbox } from '@mui/material';

const Ebaydata = () => {
  const [uuid, setUuid] = useState('');
  const [cardname, setCardName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    getName(uuid);
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }

  const getName = () => {
    axios.get(`http://localhost:5000/api/inputCardDetails/${uuid}`)
      .then(response => {
        setCardName(response.data[0].cardName);
      });
  }

  return (
    <div className="bg-gray-200 p-4">
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2 font-bold text-lg">
        Uuid:
        <input className="border-2 p-2 rounded-lg" type="text" value={uuid} onChange={e => setUuid(e.target.value)} />
      </label>
      <button className='bg-black text-white px-4 py-2 rounded-lg ml-4' onClick={()=>getName(uuid)}>View Submitted details</button>  
    </form>
      <div className="mt-4"> 
        <p className="mt-4 text-black font-semibold">Selected card name: {cardname}</p>
      </div>  
      <div>
        <p className="mt-4 text-black font-semibold">I have checked that the details are correct</p>
      <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {isChecked && (
        <form>
            <label className='p-1 underline text-lg font-bold my-1'>Name: </label>
            <input className='border-2 p-3 rounded-md my-1' type='text' name='name' onChange={(event) => {setCardName(event.target.value);}}/>
        </form> 
      
      )}
    </div>
     
    
    </div>
  );
};


export default Ebaydata;

///
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const S3_BUCKET_URL = 'https://s3.amazonaws.com/my-bucket';

// const Image = (props) => {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     // Send a GET request to the S3 bucket to retrieve the image
//     axios.get(`${S3_BUCKET_URL}/${props.imageName}`, { responseType: 'arraybuffer' })
//       .then((response) => {
//         // Convert the binary data to a base64-encoded string
//         const base64 = btoa(
//           new Uint8Array(response.data)
//             .reduce((data, byte) => data + String.fromCharCode(byte), '')
//         );

//         // Set the resulting data as the source for the image
//         setImageData(`data:;base64,${base64}`);
//       })
//       .catch((error) => {
//         // Handle any errors that occurred during the request
//         console.error(error);
//       });
//   }, [props.imageName]);

//   return (
//     <img src={imageData} alt={props.imageName}
