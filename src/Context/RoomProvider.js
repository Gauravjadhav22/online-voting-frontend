import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { cloudinaryUpload } from "../Config/axios";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios"
import { useAuth } from "../Context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomPass, setRoomPass] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [err, setErr] = useState({});

  const navigate = useNavigate();
  let inputData = [];

  const createRoom = (inputdata) => {
    console.log(inputdata);
    inputData = inputdata;
    let rmkey = "";

    const uuid = uuidv4();
    localStorage.setItem("uniqueId", uuid);
    axios
      .post(`/voterroom/`, { ...inputdata, chatId: uuid })
      .then((res) => {
        // console.log(res.data.response.id);
        setRoom(res.data.response);
        localStorage.setItem("roomkey", res.data.response.id);
        alert(`password for this room --> ${res.data.response.id}`);
        window.location.href = `/dashboard?room_id=${res.data?.response?._id}`;
        setRooms((prevRooms) => [...prevRooms, res.data.response]);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log(`password of this room -->`));
  };
  const getRoom = (roomId = null) => {
    let id = roomId ? roomId : localStorage.getItem("roomkey");
    axios
      .get(`/voterroom/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 202) {
          setRoom({ ...res.data, winnerDeclared: true });
          console.log({ ...res.data, winnerDeclared: true });
        } else {
          setRoom(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const editRoom = (id, data) => {
    console.log(data);
    axios
      .patch(`/voterroom/update/${id}`, {
        rivals: data.rivals,
        rivalGmail: data.rivalGmail,
        voterGmail: data.voterGmail,
      })
      .then((res) => setRoom(res.data))
      .catch((err) => console.log(err));
  };

  const getAllRooms = () => {
    axios
      .get(`/voterroom`)
      .then((res) => {
        console.log(res.data?.response);
        setRooms(res.data?.response);
      })
      .catch((err) => console.log(err));
  };
  const value = useMemo(
    () => ({
      getRoom,
      createRoom,
      roomPass,
      getAllRooms,
      room,
      rooms,
      editRoom,
      err,
      setRoom,
      setRoomPass,
    }),
    [room, rooms, roomPass]
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
  return useContext(RoomContext);
};
