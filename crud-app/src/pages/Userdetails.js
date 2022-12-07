import React, {useState, useEffect} from "react"
import Axios from "axios";
import { Button } from "@material-tailwind/react";
import { v4 as uuidv4 } from 'uuid';
import QrCode from 'qrcode';

const UserDetails =() => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [date,setDate] = useState(new Date());
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });
    let uuid = uuidv4();
   
    let url='my first qr code'
    const generateqrcode = () =>{
        QrCode.toDataURL(url).then(url => {
            console.log(url)
          })
          .catch(err => {
            console.error(err)
          })
    }
    

    // console.log(uuidv4())
    const submit = async () => {
        Axios.post("http://localhost:5000/api/create" , {
            name:name,
            email:email,
            contact:contact,
            uuid:uuid,
            
        }).then(() => {console.log('success')})
    }

   
       
    return(
        <div className="Userdetails">
            <h1>Crud app</h1>
         
                    <div className='grid justify-items-center items-center h-screen border-4'>
                        <p> Date : {date.toLocaleDateString()}</p>
                        <label className='p-1 underline'>Name: </label>
                        <input className='border-2' type='text' name='name' onChange={(event) => {setName(event.target.value);}}/>
                        <label className='p-1 underline'>Email</label>
                        <input className='border-2' type='text' name='email' onChange={(event) => {setEmail(event.target.value);}}/>
                        <label className='p-1 underline'>Contact</label>
                        <input className='border-2' type='text' name='contact' onChange={(event) => {setContact(event.target.value);}}/>
                        <Button className='border-2 border-rose-600' onClick={submit}>Submit</Button>
                  
                        <h1>QR Code</h1>
                        <Button onClick={generateqrcode}>test</Button>
                    </div>
          
        </div>
        );
};

export default UserDetails;