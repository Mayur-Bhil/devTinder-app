import React from 'react'

const UserCard = ({user}) => {
  console.log(user);
  const {firstName,lastName,age,about,photoUrl,gender,skills} = user; 
  
  return (
    <div className='flex justify-center my-15  '>
        <div className="card  p-4 card-border bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl  w-96">
  <figure>
    <img
      className='rounded-lg'
      src={user.photoUrl}
        alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +  " " + lastName }</h2>
    <p>{age} {gender}</p>
    <p>{about}</p>
    <h2 className=' text-lg text-black font-medium'>skills</h2>
    {skills.map((skill,index)=><p className='' key={index}>{skill}</p>)}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore !</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
