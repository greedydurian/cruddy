import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import UserDetails from './Userdetails';
import {Cardinfo} from './Cardinfo';
import {Displaycard} from './Displaycard';

const First = () => {
  return (
    
    <div className="bg-gray-200 grid h-screen flex content-center justify-center items-center gap-4">
      <h1>WASSUP BITCHES</h1>
        <Link to='/UserDetails' className='bg-gray-300 rounded'>
          <button className="bg-black text-white px-4 py-2 rounded-lg">User Details</button>
        </Link>
        <Link to='/Cardinfo' className='bg-gray-300 rounded'>
          <button className="bg-black text-white px-4 py-2 rounded-lg">Card Details</button>
        </Link>
        <Link to='/Displaycard' className='bg-gray-300 rounded'>
          <button className="bg-black text-white px-4 py-2 rounded-lg">Check user</button>
        </Link>
    </div>
  );
};

export default First;