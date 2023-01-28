import React, { useState } from 'react'
import { useRoom } from '../Context/RoomProvider'
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'
import vote1 from "../assets/vote1.jpg"

const JoinAsVoter = () => {
    const navigate = useNavigate()

    const [roomKey, setRoomKey] = useState("")
    const { getRoom } = useRoom()
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("roomkey", roomKey)
        getRoom(roomKey)
        navigate('/dashboard')

    }


    return (
        <div className='mx-8 capitalize mt-12 flex flex-col items-center justify-center text-2xl'>
            <div className='mt-14 flex flex-col justify-center items-center text-3xl text-white'>
                <h1>Joining As Voter</h1>
                <p className='text-2xl mt-12'>please enter the id of Room</p>
            </div>

            <form className='flex flex-col mt-2 text-white' onSubmit={handleSubmit}>
                <div>

                    <label className='mr-2'>enter the roOM id:</label>
                    <input required className='text-black text-center p-1 px-2 rounded-lg' placeholder='5435jfsdfdw43f' onChange={(e) => setRoomKey(e.target.value)} />
                </div>
                <input className='mt-3 text-2xl bg-purple-600 rounded-lg' type="submit" value="Join" />
            </form>
         
         
            <div style={{ background: `url(${vote1})`, backgroundSize: "contain" ,backgroundRepeat:"repeat"}} className='h-3/5 sm:h-64 w-full absolute bottom-0'>

            </div>
            <NavLink to='/createVoting' className='text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-4 left-0'>Create A New Voting</NavLink>

        </div>
    )
}

export default JoinAsVoter