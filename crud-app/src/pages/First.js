import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import UserDetails from './Userdetails';
import {Cardinfo} from './Cardinfo';

const First = () => {
  return (
    <div>
        <Link to='/UserDetails' className='border-2 border-rose-600'>User details</Link>
        <Link to='/Cardinfo' className='border-2 border-rose-600'>Card details</Link>
    </div>
  );
};

export default First;