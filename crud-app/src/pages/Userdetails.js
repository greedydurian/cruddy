import React, {useState, useEffect} from "react"
import Axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

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
      
        <div className="Userdetails bg-gray-200 p-4 flex flex-col items-center" >
              
                    <div className='grid justify-items-center items-center h-screen border-4 border-black rounded-md w-full'>
                    <h1 className="text-2xl font-bold">User details</h1>
                        <p className="text-sm"> Date : {date.toLocaleDateString()}</p>
                        <label className='p-1 underline text-lg font-bold my-1'>Name: </label>
                        <input className='border-2 p-3 rounded-md my-1' type='text' name='name' onChange={(event) => {setName(event.target.value);}}/>
                        <label className='p-1 underline text-lg font-bold my-1'>Email</label>
                        <input className='border-2 p-3 rounded-md my-1' type='text' name='email' onChange={(event) => {setEmail(event.target.value);}}/>
                        <label className='p-1 underline text-lg font-bold my-1'>Contact</label>
                        <input className='border-2 p-3 rounded-md my-1' type='text' name='contact' onChange={(event) => {setContact(event.target.value);}}/>
                        <button className="bg-black text-white px-4 py-2 rounded-lg my-1" onClick={submit}>Submit</button>
                        <Link to='/'>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg my-1">Back to home page</button>
                        </Link>
                        <Link to='/Cardinfo'>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg my-1">To next page</button>
                        </Link>
                    </div>
          
        </div>
        );
};

export default UserDetails;