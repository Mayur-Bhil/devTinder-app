import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user?.data);
  
 
  
  
  
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"/>
      <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>
    {user && (<div className="dropdown dropdown-end flex justify-center">
      <p className="py-2 mr-2 font-['montserat']]">welcome, {user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-1">
          <div className="w-10 rounded-full">
          <img
            alt=""
            src={user.photoUrl}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div> )}
  </div>
</div>
  );
};

export default Navbar;
