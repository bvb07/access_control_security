import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Login.js'
import Album from './Album'
import Register from './Register'
import Forgot from './Forgot'
import Reset from './Reset'
import Admin from './Admin'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>

    {/* <Route path ="/" element = {<App/>}></Route> */}
    <Route path ="/" element = {<Login/>}></Route>
    <Route path ="/register" element = {<Register/>}></Route>
    <Route path ="/album" element = {<Album/>}></Route>
    <Route path ="/forgot" element = {<Forgot/>}></Route>
    <Route path ="/reset/:token" element = {<Reset/>}></Route>
    <Route path ="/Admin" element = {<Admin/>}></Route>
    
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

