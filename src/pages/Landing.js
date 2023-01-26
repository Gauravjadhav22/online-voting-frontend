import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'
import { BiLogOut } from "react-icons/bi"
import vote5 from "../assets/vote5.jpg"
const Landing = () => {
    const { logout, login, user } = useAuth()

    function SignIn() {

        return (
            <div className='mt-14 text-4xl flex justify-center'>
                <button className="p-2 rounded-2xl shadow text-white w-fit bg-blue-500" onClick={() => login()}>Sign in with Google</button>

            </div>
        )

    }
    function SignOut() {
        return user && (
            <button className="m-4 flex items-center bg-red-900 p-1 rounded-xl text-white text-2xl" onClick={() => logout()}><span className='mr-1'>Sign Out</span> <BiLogOut /> </button>
        )
    }

    return (
        <div style={{ background: `url(${vote5})`, backgroundSize: "cover" }} className='h-screen'>
            <div className='flex text-black flex-col items-center capitalize'>
                <div className='leading-8 text-lg font-medium mx-2 w-fit shadow p-12 bg-blue-100 mt-12'>

                    <h1 className='animate-pulse text-center text-3xl text-purple-500 transition-all delay-1000'>join the online voting..</h1>
                    <ul className='text-xl leading-10 list-disc'>
                        <li>Create Voting Room - Once you signed with your google account </li>
                        <li>you can create or join the multiple voting rooms by specific -- room key</li>
                        <li>room key- it is the address of that voting room</li>
                    </ul>
                </div>
                <div className='shadow-sm shadow-black px-14 mt-12'>
                    {
                        user && <><div className='bg-violet-100 mt-12 border-2 shadow-green-700 shadow-md cursor-pointer  text-black rounded-lg py-1 text-3xl px-2 my-2 hover:text-blue-400 hover:animate-pulse'>
                            <NavLink to='/createVoting'>
                                create An Voting ..
                            </NavLink>

                        </div>
                            <div className='border-2 bg-purple-100 shadow-green-700 shadow-md cursor-pointer  text-black rounded-lg py-1 px-2 text-3xl my-8 hover:text-blue-400 hover:animate-pulse'>
                                <NavLink to='/joinAVoting'>
                                    join a voting ..
                                </NavLink>
                            </div>
                            <SignOut />
                        </>
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