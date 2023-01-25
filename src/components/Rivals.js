import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import man from "../assets/man.png"
import man2 from "../assets/man2.png"
import gif1 from "../assets/365.gif"
import gif2 from "../assets/4M57.gif"
import axios from '../Config/axios'
import { useRoom } from '../Context/RoomProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/AuthProvider'
const Rivals = () => {

  const { room, getRoom, setRoom } = useRoom()
  const [voted,setVoted] =useState(false)
  const { user } = useAuth()
  const [rivalsData, setRivalsData] = useState([])
  useEffect(() => {
    let id = localStorage.getItem("roomkey")
    // console.log(room);
    // setRivalsData(room.rivals)
    axios.get(`/voterroom/${id}`).then(res => {
      // console.log(res.status)
      // setRivalsData(res.data)
      toast.success(`${res.data.msg}`, {
        position: toast.POSITION.TOP_CENTER
      })
      if (res.status === 202) {
        setRivalsData({ ...res.data.winner, winner: true })
        console.log({ ...res.data.winner, winner: true });
      }
    }).catch(err => {
      toast.error(`${err.response.data.msg}`, {
        position: toast.POSITION.TOP_CENTER
      })
      // if (err.code === 'ERR_BAD_REQUEST') {
      //   setRivalsData({ ...err.response.data.winner, winner: true })
      //   console.log({ ...err.response.data.winner, winner: true });
      // }

    }

    )
    getRoom()

    setRivalsData(room)

  }, [voted])



  // setInterval(() => {
  //   getRoom()
  //   setRivalsData(room)

  // }, 50000);

  const voteCasting = (rivalsgmail) => {
    let id = localStorage.getItem('roomkey')
    axios.patch(`/voterroom/update/${id}`, { rivals: room.rivals, rivalGmail: rivalsgmail, voterGmail: user.email })
      .then(res => {
        setRoom(res.data)
        toast.success(`voted to ${rivalsgmail}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }).catch(err => toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_CENTER
      })).finally(()=>setVoted(!voted))


  }

  return (
    <>
      <h1 className='text-4xl text-orange-500'> {room.title}</h1>
      <div className='w-fit flex justify-center gap-5 flex-wrap my-8'>
        {
          rivalsData.winner && <div className='flex items-center flex-col justify-center' >
            <h1 className='text-2xl text-white capitalize '>here is your winner <span className='text-green-500 font-semibold'>{rivalsData.name}</span> with<span className='text-green-500 font-semibold'> {rivalsData.count}</span>  votes</h1>

            <div className='flex items-center justify-center '>
              <img style={{ marginRight: "-103px" }} className='rounded-full z-10' src={gif2} height={320} width={150} />
              <div >

                <div key={rivalsData._id} className='px-1 w-fit h-fit m-4 bg-purple-900 flex flex-col text-black  items-center justify-center shadow-md shadow-green-300 rounded-md mx-2'>


                  <div className='w-44 h-44 overflow-hidden p-0 border-3 rounded-full border-yellow-50 mt-1 bg-white flex flex-col text-black  items-center justify-center shadow '>
                    <img src={rivalsData.img || man} className='w-full h-full' />
                  </div>



                  <div className=' text-center text-white font-semibold text-lg px-1'>
                    <h2 className='px-1 capitalize  shadow-md my-4 shadow-amber-300  max-w-xs break-words'>no. of  votes {rivalsData.count}</h2>
                    <h2 className='px-1 capitalize  shadow-md my-4 shadow-red-300  max-w-xs break-words '>
                      {rivalsData.name}</h2>
                    <h2 className='px-1  shadow-md my-4 max-w-xs break-words shadow-pink-300' >{rivalsData.email}</h2>
                  </div>



                </div>

              </div>
              <img style={{ marginLeft: "-123px" }} className='rounded-full z-10' src={gif2} height={320} width={150} />

            </div>
            <img src={gif1} height={120} width={450} />
          </div>

        }


        {
          rivalsData?.rivals?.map(item => {
            return <div key={item._id} className='px-1 w-fit h-fit m-4 bg-cyan-800 flex flex-col text-black  items-center justify-center shadow-sm shadow-green-300 rounded-md mx-2'>


              <div className=' w-44 h-44 overflow-hidden p-0 border-3 rounded-full border-yellow-50 mt-1 bg-white flex flex-col text-black  items-center justify-center shadow '>
                <img src={item.img || man} className='w-full h-full ' />
              </div>



              <div className=' text-center text-white font-semibold text-lg px-1'>
                <h2 className='px-1 capitalize shadow-sm my-4 shadow-violet-300  max-w-xs break-words'>no. of  votes {item.count}</h2>
                <h2 className='px-1 capitalize shadow-sm my-4 shadow-orange-300  max-w-xs break-words '>
                  {item.name}</h2>
                <h2 className='px-1 shadow-sm my-4 max-w-xs break-words shadow-blue-300' >{item.email}</h2>
              </div>


              <button onClick={() => voteCasting(item.email)} className='p-1 my-2 px-4 text-white bg-blue-500 rounded-lg text-xl'>
                Cast Your Vote 🗳️
              </button>

            </div>
          })
        }
      </div>
      <ToastContainer />


    </>
  )
}

export default Rivals