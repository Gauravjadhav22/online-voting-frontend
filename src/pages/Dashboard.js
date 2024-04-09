import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Rivals from "../components/Rivals";
import { useAuth } from "../Context/AuthProvider";
import { BiLogOut } from "react-icons/bi";
import { useRoom } from "../Context/RoomProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Voters from "../components/Voters";
import AllRooms from "../components/AllRooms";
const Dashboard = () => {
  const { logout, login, user } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { getRoom, room, err, rooms, getAllRooms, roomPass } = useRoom();
  console.log(room);

  useEffect(() => {
    getRoom();
    getAllRooms();
    console.log(err);
    toast(err);
    return () => {};
  }, [err, searchParams.get("room_id")]);

  function SignOut() {
    return (
      user && (
        <button
          className="m-4 flex items-center bg-red-900 p-1 rounded-xl text-white text-2xl"
          onClick={() => logout()}
        >
          <span className="mr-1 px-2">Sign Out</span> <BiLogOut />{" "}
        </button>
      )
    );
  }
  return (
    <div className="">
      <SignOut />

      <div className="my-24 flex flex-col justify-center items-center">
        <Rivals />
        {/* <Voters/> */}

        <NavLink
          to="/joinAVoting"
          className="text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-20 right-10"
        >
          Join A New Voting
        </NavLink>
        <NavLink
          to="/createVoting"
          className="text-black bg-green-400 p-2 rounded-lg font-semibold absolute top-20 right-52"
        >
          Create A New Voting
        </NavLink>
      </div>
      {(room?._id || room?.winner?._id) && <ChatBox />}
      {/* <AllRooms positonLeft={true} /> */}
    </div>
  );
};

export default Dashboard;
