import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import UserDetails from './Userdetails';
import {Cardinfo} from './Cardinfo';

const First = () => {
  return (
    <div className="bg-white grid h-56 flex content-center justify-center items-center gap-4">
        <Link to='/UserDetails' className='bg-gray-300 rounded'>
          <button className="bg-black text-white px-4 py-2 rounded-lg">User Details</button>
        </Link>
        <Link to='/Cardinfo' className='bg-gray-300 rounded'>
          <button className="bg-black text-white px-4 py-2 rounded-lg">Card Details</button>
        </Link>
    </div>
  );
};

export default First;