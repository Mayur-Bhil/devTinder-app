import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSclice'
import { useEffect } from 'react'

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const fetchUser = async() => {
  try {
          const res = await axios.get(BASE_URL+"/profile/view",{
          withCredentials:true
      });
      // console.log(res.data);
      
      dispatch(addUser(res.data))
      
  } catch (error) {
        navigate("/login")
        console.log(error);
          
    }

  }

useEffect(()=>{
  fetchUser();
},[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body
