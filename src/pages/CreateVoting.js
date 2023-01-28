import React, { useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRoom } from "../Context/RoomProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import vote9 from "../assets/vote8.jpg"
import imglogo from "../assets/image.png"

import { NavLink } from 'react-router-dom';
const CreateVoting = () => {
    const { createRoom } = useRoom()

    const [noOfRivals, setNoOfRivals] = useState(0);
    const emailRegex = /\S+@\S+\.\S+/;
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [Rivals, setRivals] = useState([]);
    const [deadline, setDeadline] = useState(1);
    const [imgUploaded, setImgUploaded] = useState(false);

    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);

    const [selected, setSelected] = useState('');

    const validateEmail = (value) => {

        if (emailRegex.test(value)) {
            setEmail(value);
        } else {
            setEmail("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputVisible(true)

        if (noOfRivals > 0) {
            if (noOfRivals == 1) {

                console.log(uuidv4());
                console.log(Rivals, title);
                createRoom({ rivals: [...Rivals, { img, name, email }], title: title, hours: deadline })

                setTitle("")
            }
            const match = Rivals.find(item => item.email === email || item.name === name)

            if (match) {
                toast.error("please provide different name or email", {
                    position: toast.POSITION.TOP_CENTER
                });

                setNoOfRivals(noOfRivals + 1)

                setTimeout(() => {

                    window.location.reload()
                }, 2000);


            }

            Rivals.push({ name, img, email })
            setNoOfRivals(noOfRivals - 1)
            setEmail("")
            setName("")
            setImg("")
            setImgUploaded(false)
            console.log(Rivals);
        }


    }


    const handleSubmitTitle = (e) => {
        e.preventDefault()

        setSelected(true)

    }


    const uploadImg = (img) => {

        setLoading(true)

        const data = new FormData()
        data.append("file", img)
        data.append("upload_preset", "voters")
        data.append("cloud_name", "dfloi7bv1")
        axios.post("https://api.cloudinary.com/v1_1/dfloi7bv1/image/upload", data).then(res => {
            console.log(res.data.secure_url);


            setImg(res.data.secure_url)
            setImgUploaded(true)

        }).catch(err => console.log(err))


            .finally(() => {

                setLoading(false)
                setImgUploaded(true)

                toast.success("image successfully uploaded", {
                    position: toast.POSITION.TOP_CENTER
                });

            })
    }


    let InputForm = []
    for (var i = 0; i < noOfRivals; i++) {
        InputForm.push(
            <form key={i} className='absolute my-4 mt-12 ml-0' onSubmit={handleSubmit}>
                <div key={i} className="items-center justify-center shadow shadow-cyan-400 bg-slate-500 rounded-2xl text-blueBg w-fit p-3 my-2 ">
                    <h1 className='text-3xl text-center font-semibold'>Enter details for participant <span className='text-4xl text-white normal-case'>{(i + 1)}th</span></h1>



                    {
                        imgUploaded && <>
                            <div className='my-4 w-fit flex justify-between items-center text-xl'>

                                <label className='font-semibold ' >Name:</label >
                                <input required onChange={(e) => setName(e.target.value)} name='name' className='rounded-lg p-1 ml-3 bg-blueBg text-white' type="text" placeholder='cj' />
                            </div>
                            <div className='my-4 w-fit flex justify-between items-center text-xl'>

                                <label className='font-semibold' >Email:</label >
                                <input onChange={(e) => {
                                    validateEmail(e.target.value)
                                }} className='rounded-lg p-1 ml-3 bg-blueBg text-white' name='email' required type="email" placeholder='cj@gmail.com' />
                            </div></>

                    }
                    {!imgUploaded &&<div className='text-xl flex justify-center w-96'>
 
                        <label className='font-semibold flex flex-col items-center mt-4 py-2 px-14'>
                            <h1>Choose Pic:</h1>
                        <img src={imglogo} className='h-16'/>
                        
                        <input onChange={(e) => {
                            uploadImg(e.target.files[0])
                        }} className='rounded-lg  bg-blueBg invisible' required type="file" />
                        </label >
                        
                    </div>
                    }

                </div>
                <button disabled={!imgUploaded} type='submit' className='w-full bg-green-500 p-1 text-3xl rounded-xl'>submit</button>
            </form>
        );
    }





    return (
        <div className='flex justify-center flex-col'>

            {
                loading ? (

                    <div className='flex justify-center text-center'>

                        <Loading subTitle="plese wait... image is being uploaded " />


                    </div>

                ) : (
                    <div className='flex justify-center'>
                        <div className='mx-8 my-4 capitalize fle flex-col items-center  text-white mt-14'>
                            <h1 className='text-xl mb-8'>
                                create a voting room by adding participants details
                            </h1>
                            {!selected && <form className='flex flex-col text-xl ' onSubmit={handleSubmitTitle}>

                                <div>


                                    <label className='text-xl' >Title:</label>
                                    <input onChange={(e) => setTitle(e.target.value)}
                                        className='border-2 rounded mt-8 mx-2 p-2 bg-black border-blue-700' required
                                        placeholder='enter title for voting room' />
                                </div>
                                <br />
                                <div className='my-5'>


                                    <label>enter the termination time in hours : </label>
                                    <input onChange={(e) => setDeadline(e.target.value)} required placeholder='1' className='text-blueBg px-1 w-16' min="1" max="24" type="number" />
                                </div>
                                <input className='p-1 bg-purple-700 rounded-lg' type="submit" value="submit"  />
                            </form>}

                            {selected && !inputVisible && <div className='mt-14 text-2xl flex'>

                                <label className='font-semibold ' htmlFor="noofrivals" >no of Participants:</label >
                                <select name="noofrivals" className='ml-2 bg-blue-600 text-white' onChange={(e) => {
                                    console.log(e.target.value);
                                    setNoOfRivals(e.target.value)
                                }}>
                                    <option value="0" >Select Value</option>

                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>}


                            {InputForm}
                            <ToastContainer />
                        

                        </div>
                    </div>
                )
            }
          
            <NavLink to='/joinAVoting' className='text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-2 right-2'>Join A New Voting</NavLink>
            </div>

    )
}

export default CreateVoting