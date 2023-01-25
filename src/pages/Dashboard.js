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
        room && <>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-3xl text-white my-4 capitalize'>share the key of this room --&gt;<span className='text-xl mx-4 text-red-500 font-semibold'>{localStorage.getItem("roomkey")}</span> </p>
            <Rivals />
            {/* <Voters/> */}


          </div>
          <ChatBox /></>
      }

    </div>

  )
}

export default Dashboard