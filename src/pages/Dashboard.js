import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ChatBox from '../components/ChatBox'
import Rivals from '../components/Rivals'
import { useAuth } from '../Context/AuthProvider'
import { BiLogOut } from "react-icons/bi"
import { useRoom } from '../Context/RoomProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Voters from '../components/Voters'
const Dashboard = () => {
  const { logout, login, user } = useAuth()
  const { getRoom, room, err } = useRoom()

  useEffect(() => {
    console.log(err);
    toast(err)
    return () => { }
  }
    ,
    [err])


  function SignOut() {
    return user && (
      <button className="m-4 flex items-center bg-red-900 p-1 rounded-xl text-white text-2xl" onClick={() => logout()}><span className='mr-1'>Sign Out</span> <BiLogOut /> </button>
    )
  }
  return (
    <div className=''>

      <SignOut />
      {
        room.title?( <>
          <div className=' my-24 flex flex-col justify-center items-center'>
            <p className='text-3xl text-white my-4 capitalize'>share the key of this room --&gt;<span className='text-xl mx-4 text-red-500 font-semibold'>{localStorage.getItem("roomkey")}</span> </p>
            <Rivals />
            {/* <Voters/> */}

            <NavLink to='/joinAVoting' className='text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-20 right-10'>Join A New Voting</NavLink>
            <NavLink to='/createVoting' className='text-black bg-green-400 p-2 rounded-lg font-semibold absolute top-20 right-52'>Create A New Voting</NavLink>

          </div>
          <ChatBox /></>):<><h1 className='text-white text-center text-3xl capitalize'>no room is joined </h1> 
          <NavLink to='/joinAVoting' className='text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-50 right-20'>Join A New Voting</NavLink>
          
          </>
      }
    
    </div>

  )
}

export default Dashboard