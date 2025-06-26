import React from 'react'

const UserCard = ({user}) => {
  console.log(user);
  const {firstName,lastName,age,about,photoUrl,gender,skills} = user; 
  
  return (
    <div className='flex justify-center my-15 '>
        <div className="card w-96 backdrop-blur-3xl bg-white/10 shadow-sm">
  <figure>
    <img
      className='rounded-lg'
      src={user.photoUrl}
        alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +  " " + lastName }</h2>
    {age && gender && <p>{age + " , " + gender | male}</p>}
    <p>{about}</p>
    <p>{skills.map((skill,index)=><p key={index}>{skill}</p>)}</p>
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
