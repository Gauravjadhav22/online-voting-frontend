import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { cloudinaryUpload } from "../Config/axios";
import { v4 as uuidv4 } from 'uuid';
// import axios from "axios"
import { useAuth } from '../Context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [room, setRoom] = useState({});
    const [roomPass, setRoomPass] = useState("");

    const [err, setErr] = useState({});

    const navigate = useNavigate();
    let inputData = []




    const createRoom = async (inputdata) => {

        inputData = inputdata
        let rmkey = ''

        return new Promise((resolve, reject) => {
            const uuid = uuidv4();
            localStorage.setItem('uniqueId', uuid)
            axios.post(`/voterroom/`, { ...inputdata, chatId: uuid }).then(res => {

                // console.log(res.data.response.id);
                setRoom(res.data.response)
                localStorage.setItem("roomkey", res.data.response.id)
                alert(`password of this room --> ${res.data.response.id}`)
                window.location.href = '/dashboard'
                return res.data

            }
            ).catch(err => console.log(err)).finally(() => {
                resolve()
                console.log(`password of this room -->`)
        
        })







        })




    }
    const getRoom = () => {
        let id = localStorage.getItem('roomkey')

        axios.get(`/voterroom/${id}`).then(res => {
            setRoom(res.data)
        }).catch(err => console.log(err))
    }



    const editRoom = (id, data) => {
        axios.patch(`/voterroom/update/${id}`, { rivals: data.rivals, rivalGmail: data.rivalGmail, voterGmail: data.voterGmail }).then(res => setRoom(res.data)).catch(err => console.log(err))

    }




    const value = useMemo(
        () => ({
            getRoom,
            createRoom,
            roomPass,room, editRoom, err, setRoom
        }),
        [room]
    );


    return <RoomContext.Provider value={value}>
        {children}
    </RoomContext.Provider>;
};

export const useRoom = () => {
    return useContext(RoomContext);
};