import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSclice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL} from "../utils/constants"

const Login = () => {
  const [emailId,setEmail] = useState("rekha@gmail.com");
  const [password,setpassword] = useState("Lpd@2854455");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async()=>{
    try {
        const res = await axios.post(BASE_URL+"/login",{
          emailId,
          password
        },{
          withCredentials:true
        })
        console.log(res.data.user);
        dispatch(addUser(res.data.user))
        navigate("/")
        
    } catch (error) {
        console.error(error);
        
    }

  }

  return (
  <div className='flex justify-center py-[15vw]'>

  <div className="card p-4 card-border bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl   backdrop-blur-full  w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
  <fieldset className="fieldset">
    <legend className="fieldset-legend font-medium">What is your Email?</legend>
    <input onChange={(e)=>{
        setEmail(e.target.value)
    }} 
     value={emailId} type="text" className="email p-2 text-sm" placeholder="test@gmail.com" />
    <legend className="fieldset-legend font-medium">What is your password?</legend>
    <input 
    onChange={(e)=>{
        setpassword(e.target.value)
    }}
    value={password} type="text" className="password p-2 text-sm" placeholder="#131132" />
    
</fieldset>
    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handelLogin}>login</button>
    </div>
  </div>
</div>
</div>

  )
}

export default Login
