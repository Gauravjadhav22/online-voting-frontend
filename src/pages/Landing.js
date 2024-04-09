import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'
import { BiLogOut } from "react-icons/bi"
import vote5 from "../assets/vote5.jpg"
const Landing = () => {
    const { logout, login, user } = useAuth()

    function SignIn() {

        return (
            <div className='text-2xl flex justify-center'>
                <button className="text-white w-fit p-2 rounded-xl bg-blue-500" onClick={() => login()}>Sign In with Google</button>

            </div>
        )

    }
    function SignOut() {
        return user && (
            <button className="flex items-center bg-red-900 p-1 px-2 rounded-xl text-white text-2xl" onClick={() => logout()}><span className='mr-1'>Sign Out</span> <BiLogOut /> </button>
        )
    }

    return (
        <div style={{ background: `url(${vote5})`, backgroundSize: "cover" }} className='h-screen'>
            <div className='flex text-black flex-col items-center capitalize'>
                <div className={`leading-8 text-lg font-medium mx-2 w-fit shadow border-cyan-200 bg-white border-2 p-12 ${!user?'mt-28':'mt-12'}`}>

                    <h1 className='text-center text-3xl text-purple-500'>join the online voting..</h1>
                    <ul className='text-xl leading-10 list-disc'>
                        <li>Create Voting Room - Once you signed with your google account </li>
                        <li>you can create or join the multiple voting rooms by specific -- room key</li>
                        <li>room key- it is the address of that voting room</li>
                    </ul>
                </div>
                <div className={`mt-12 border-2 px-12 custom-blur p-4 rounded-lg shadow-lg`}>
                    {
                        user && <div className='p-2 flex-col gap-6 flex items-center justify-center'>
                            <div className='bg-violet-100 border-2 cursor-pointer shadow text-black rounded-lg py-1 text-3xl px-2 hover:text-gray-700'>
                            <NavLink to='/createVoting'>
                                create An Voting ..
                            </NavLink>

                        </div>
                            <div className='border-2 bg-purple-100 shadow cursor-pointer  text-black rounded-lg py-1 px-2 text-3xl hover:text-gray-700'>
                                <NavLink to='/joinAVoting'>
                                    join a voting ..
                                </NavLink>
                            </div>
                            <SignOut />
                        </div>
                    }
                    {
                        !user && <SignIn />

                    }
                </div>

                {/* <Rivals/> */}
            </div></div>
    )
}

export default Landing