import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'
import { BiLogOut } from "react-icons/bi"

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
          <button className="m-4 flex items-center bg-red-900 p-1 rounded-xl text-white text-2xl" onClick={() => logout()}><span className='mr-1'>Sign Out</span> <BiLogOut/> </button>
        )
      }

    return (
        <div className='flex text-white flex-col mt-14 items-center capitalize'>

            <div className='border-2 leading-8 border-cyan-600 text-lg font-medium mx-2 w-fit shadow p-2 mt-4'>

                <h1 className='animate-pulse text-center text-3xl text-purple-500 transition-all delay-1000'>join the online voting..</h1>
                <ul >
                    <li>Rival- need to join the exact email that admin has added to voting room(Canditdate)</li>
                    <li>Voter- can join with any gmail account</li>
                </ul>
            </div>

            {
                user && <><div className='mt-12 border-2 shadow-green-700 shadow-md cursor-pointer  text-white rounded-lg py-1 text-3xl px-2 my-2 hover:text-blue-400 hover:animate-pulse'>
                    <NavLink to='/createVoting'>
                        create An Voting ..
                    </NavLink>

                </div>
                    <div className='border-2 shadow-green-700 shadow-md cursor-pointer  text-white rounded-lg py-1 px-2 text-3xl my-8 hover:text-blue-400 hover:animate-pulse'>
                        <NavLink to='/joinAVoting'>
                            join a voting ..
                        </NavLink>
                    </div>
                    <SignOut/>
                </>
            }
            {
                !user && <SignIn />

            }

            {/* <Rivals/> */}
        </div>
    )
}

export default Landing