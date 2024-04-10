import React, { useEffect, useState } from "react";
import { useRoom } from "../Context/RoomProvider";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import vote1 from "../assets/vote1.jpg";
import AllRooms from "../components/AllRooms";
import { toast } from "react-toastify";

const JoinAsVoter = () => {
  const navigate = useNavigate();
  const { getRoom, room, err, rooms, getAllRooms } = useRoom();
  console.log(room);
  useEffect(() => {
    getAllRooms();
    console.log(err);
    toast(err);
    return () => {};
  }, [err]);
  const [roomKey, setRoomKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("roomkey", roomKey);
    getRoom(roomKey);
    navigate(`/dashboard?room_id=${roomKey}`);
  };

  return (
    <div className="mx-8 capitalize mt-12 flex flex-col items-center justify-center text-2xl">
      <div className="mt-14 flex flex-col justify-center items-center text-3xl text-white">
        <h1>Joining As Voter</h1>
        <p className="text-2xl mt-12">please enter the id of Room</p>
      </div>

      <form className="flex flex-col mt-2 text-white" onSubmit={handleSubmit}>
        <div>
          <label className="mr-2">enter the roOM id:</label>
          <input
            required
            className="text-black text-center p-1 px-2 rounded-lg"
            placeholder="5435jfsdfdw43f"
            onChange={(e) => setRoomKey(e.target.value)}
          />
        </div>
        <input
          className="mt-3 text-2xl bg-purple-600 rounded-lg"
          type="submit"
          value="Join"
        />
      </form>
      <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: `url(${vote1})`,
      backgroundSize: "contain", // Adjusted to cover the div
      height: "40vh", // Adjusted height for visibility
    }}
  ></div>

      <NavLink
        to="/createVoting"
        className="text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-4 left-4"
      >
        Create A New Voting
      </NavLink>
      <AllRooms />
    </div>
  );
};

export default JoinAsVoter;
