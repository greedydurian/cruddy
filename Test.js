import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

const Cardinfo =() => {
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");

  const handleSubmit = (e) => {
    // Preventing the default behavior of the form submit
    e.preventDefault();

    // Getting the value and name of the input which triggered the change
    const inputValue = e.target.value;

    console.log("target", e.target.value);
    // use input to save
    setEmail(inputValue);
    setUuid(uuidv4());
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
            <label>Please enter your email:</label>
        </div>
        <div className="row">
         
            <label value="email">
              Email:
            </label>
         
          <div className="col-sm-5">
            <div className="row">
              <input
                email="email"
                type="email"
                className="form-control"
                placeholder="Type your email here"
              ></input>
            </div>
            <div className="row">
                <Button type="submit" className='border-2 border-rose-600'>Submit</Button>
             
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className=" col-sm-2 label-font">
       
          <label className="label-font">Result:</label>
        </div>
        <div>
          <label className="result-output">
             {uuid}
          </label>
          <br></br>
          

        </div>
        <Link to='/Userdetails' className='border-2 border-rose-600'>Next page</Link>
      </div>
    </div>
  );
}

export default Cardinfo;


////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import Axios from "axios";
import QRCode from "qrcode.react";

const Cardinfo = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);

  // get card details
  const getDetails = () => {
    Axios.get("http://localhost:5000/api/details").then((response) => {
      setUserDetails(response.data);
      console.log(response);
    });
  };

  //on click generate these and send to db
  const getCard = async () => {
    Axios.post("http://localhost:5000/api/createcard", {
      name: name,
      email: email,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="bg-blue-500 text-white p-4">
      <h1>Cardinfo</h1>
      <Button className="border-2 border-rose-600" onClick={getDetails}>
        View Submitted details
      </Button>

      {userDetails.map((value, key) => {
        return (
          <div>
            <div className="employee">
              <div>
                <h3>Email: {value.email}</h3>

                <input
                  className="border-gray-400 rounded p-2"
                  type="radio"
                  name="Email"
                  value={value.email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                Email

                <h3>Name: {value.name}</h3>
                <input
                  className="border-2"
                  type="radio"
                  name="contactName"
                  value={value.name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                Name
              </div>
            </div>
          </div>
        );
      })}
      {email && <p>Selected email: {email}</p>}
      {name && <p>Selected name: {name}</p>}
      <button
        className="bg-black text-white px-4 py-2 rounded-lg"
        onClick={getCard}
      >
        Submit to db
      </button>
      <button
        className="bg-black text-white px-4 py-2 rounded-lg"
        onClick={() => setQrCodeData(name)}
      >
        Generate QR code
