import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import './index.css';
import Cardinfo from './pages/Cardinfo';
import Userdetails from './pages/Userdetails';
import Displaycard from './pages/Displaycard';
import Ebaydata from './pages/Ebaydata'


ReactDOM.render(
  
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/Cardinfo' element={<Cardinfo/>}/>
        <Route path='/Userdetails' element={<Userdetails/>}/>
        <Route path='/Displaycard' element={<Displaycard/>}/>
        <Route path='/Ebaydata' element={<Ebaydata/>}/>
      </Routes>
    </Router>
  
     ,
  
   document.getElementById('root')
 );