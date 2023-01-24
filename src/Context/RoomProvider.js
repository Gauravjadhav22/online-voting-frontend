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
    const { logout, login, user } = useAuth()

    const navigate = useNavigate();
    let inputData = []




    const createRoom = async (inputdata) => {
        console.log(inputdata);

        inputData = inputdata
        let rmkey = ''




        const uuid = uuidv4();
        localStorage.setItem('uniqueId', uuid)
        axios.post(`/voterroom/`, { ...inputdata, chatId: uuid }).then(res => {

            console.log(res.data.response.id);
            setRoom(res.data.response)
            localStorage.setItem("roomkey", res.data.response.id)
            alert(`password of this room --> ${res.data.response.id}`)
            window.location.href='/dashboard'


        }
        ).catch(err => console.log(err)).finally(() => console.log(`password of this room -->`))








    }
    const getRoom = () => {
        let id = localStorage.getItem('roomkey')
        console.log(id);

        axios.get(`/voterroom/${id}`).then(res => {
            console.log(res.data)
            setRoom(res.data)
        }).catch(err => console.log(err))
    }



    const editRoom = (id, data) => {
        console.log(data);
        axios.patch(`/voterroom/update/${id}`, { rivals: data.rivals, rivalGmail: data.rivalGmail, voterGmail: data.voterGmail }).then(res => setRoom(res.data)).catch(err => console.log(err))

    }




    const value = useMemo(
        () => ({
            getRoom,
            createRoom,
            roomPass,

            room, editRoom, err, setRoom
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