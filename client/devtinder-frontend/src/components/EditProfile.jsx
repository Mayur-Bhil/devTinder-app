import React, { use, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSclice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL} from "../utils/constants"
import UserCard from './userCard';

const EditProfile = ({user}) => {
  const [firstName,SetFirstName] = useState(user.firstName);
  const [lastName,SetLastName] = useState(user.lastName);
  const [password,setpassword] = useState("");
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
  const [age,setage] = useState(user.age);
  const [gender,setGender] = useState(user.gender);
  const [about,setAbout] = useState(user.about);
  const [error,setError] = useState("");
  const [skills,setSkills] = useState(user.skills || []);
  const dispatch = useDispatch();

  const SaveData = async()=>{
    try {
        const res =  await axios.patch(BASE_URL+"/profile/edit",{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills
        },{
            withCredentials:true
        })
        dispatch(addUser(res.data.data))
    } catch (error) {
        console.error(error);
        setError(error?.response?.data?.message || "Somthing went wrong")
        
    }

  }

  return (
    <div className='flex gap-4 justify-center '>
    <div className='flex justify-center py-[4vw] '>

  <div className="card w-[30vw] p-2 card-border bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl ">
  <div className="card-body">
    <h2 className="card-title justify-center">Update Profile</h2>
    <div>
  <fieldset className="fieldset">
    <label className="fieldset-legend font-medium" htmlFor='Firstname'>First Name</label>
    <input onChange={(e)=>{
        SetFirstName(e.target.value)
    }} 
     value={firstName} type="text" name="Firstname" id='Firstname' className=" Firstname text-black p-2 text-sm outline-blue-600 bg-zinc-300 rounded-sm" placeholder="" />
    <label className="fieldset-legend font-medium" htmlFor="lastName">Last Name</label>
    <input 
    onChange={(e)=>{
        SetLastName(e.target.value)
    }}
    value={lastName} type="text" name="lastName" id='lastName' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />

    <label className="fieldset-legend font-medium" htmlFor="age">Age</label>
    <input 
    onChange={(e)=>{
        setage(e.target.value)
    }}
    value={age} type="number" name="age" id='age' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />
    
    <label className="fieldset-legend font-medium" htmlFor="about">About</label>
    <input 
    onChange={(e)=>{
        setAbout(e.target.value)
    }}
    value={about} type="text" name="about" id='about' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />

<label className="fieldset-legend font-medium" htmlFor="skills">skills</label>
    <input 
  onChange={(e) => {
    const input = e.target.value;
    setSkills(input.split(',').map(skill => skill.trim()).filter(Boolean));
  }}
  value={skills.join(', ')}type="text" name="skills" id='skills' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />


     <label className="fieldset-legend font-medium" htmlFor="gender">Gender</label>
    <input 
    onChange={(e)=>{
        setGender(e.target.value)
    }}
    value={gender} type="text" name="gender" id='gender' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />
    
    <label className="fieldset-legend font-medium" htmlFor="PhotoUrl">PhotoUrl</label>
    <input 
    onChange={(e)=>{
        setPhotoUrl(e.target.value)
    }}
    value={photoUrl} type="text" name="PhotoUrl" id='PhotoUrl' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />

    <label className="fieldset-legend font-medium" htmlFor="Password">Password</label>
    <input 
    onChange={(e)=>{
        setpassword(e.target.value)
    }}
    value={password} type="Password" name="Password" id='Password' className=" p-2 text-black text-sm bg-lime-0 bg-zinc-300 outline-blue-600 border-blue-600 rounded-sm" placeholder="" />


    
</fieldset>
    </div>
      <h6 className='text-red-500'>{error}</h6>
    <div className="card-actions justify-center">
      <button className="btn btn-primary rounded-xl" onClick={SaveData}>save</button>
    </div>
  </div>
</div>
</div>
<UserCard user={{firstName,photoUrl,gender,age,lastName,about,skills}}/>

</div>
  )
}

export default EditProfile
