import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSclice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL} from "../utils/constants"

const Login = () => {
  const [emailId,setEmail] = useState("");
  const [password,setpassword] = useState("");
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

  <div className="card p-4 card-border backdrop-blur-[5px] border-2 border-white/20 rounded-xl shadow-2xl  w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
  <fieldset className="fieldset">
    <label className="fieldset-legend font-medium" htmlFor='email'>Email</label>
    <input onChange={(e)=>{
        setEmail(e.target.value)
    }} 
     value={emailId} type="text" name="email" id='email' className="email text-black p-2 text-sm outline-blue-600 bg-zinc-300 rounded-sm" placeholder="" />
    <label className="fieldset-legend font-medium" htmlFor="password">password</label>
    <input 
    onChange={(e)=>{
        setpassword(e.target.value)
    }}
    value={password} type="text" name="password" id='password' className="password p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />
    
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
