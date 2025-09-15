import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar";
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=useSelector((store)=>store.user)
   const fetchUser = async () => {
     try {
       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, {
         withCredentials: true,
       });
       dispatch(addUser(res.data));
     } catch (err) {
       navigate("/login")
       console.error(err);
     }
   };

   useEffect(() => {
     if (!user) {
     fetchUser();
   }
     
   },[]);

 

  return (
      <div>
          <Navbar />
          <Outlet />
          <Footer/>
              
          
    </div>
  )
}

export default Body