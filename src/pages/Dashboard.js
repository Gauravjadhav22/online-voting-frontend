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
    getRoom()
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

      <div className=' my-24 flex flex-col justify-center items-center'>
        <Rivals />
        {/* <Voters/> */}

        <NavLink to='/joinAVoting' className='text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-20 right-10'>Join A New Voting</NavLink>
        <NavLink to='/createVoting' className='text-black bg-green-400 p-2 rounded-lg font-semibold absolute top-20 right-52'>Create A New Voting</NavLink>

      </div>
      {

        (room?._id || room?.winner?._id) && <ChatBox />
      }


    </div>

  )
}

export default Dashboard