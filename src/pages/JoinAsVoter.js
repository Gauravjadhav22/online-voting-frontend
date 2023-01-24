import React, { useState } from 'react'
import { useRoom } from '../Context/RoomProvider'
import { useNavigate, useNavigation } from 'react-router-dom'
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
            <div className='flex flex-col justify-center items-center text-3xl text-white'>
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


        </div>
    )
}

export default JoinAsVoter