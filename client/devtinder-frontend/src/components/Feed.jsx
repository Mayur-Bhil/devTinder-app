import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSclice'
import { useEffect } from 'react'
import UserCard from './userCard'

const Feed = () => {
const feed = useSelector(store => store.feed);  
const dispatch = useDispatch();

const getFeed = async() =>{
  if(feed) return;
  try {
    const res = await axios.get(BASE_URL+"/feed",{
      withCredentials:true
    });
    console.log(res.data);
    
   dispatch(addFeed(res?.data))

  } catch (error) {
      console.log(error);
      
      }
   }

useEffect(()=>{
  getFeed();
},[])
  return feed && (
    <div className=''>
        <UserCard user={feed[6]}/>
    </div>
  )
}

export default Feed
