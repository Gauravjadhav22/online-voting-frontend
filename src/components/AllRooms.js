import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRoom } from "../Context/RoomProvider";
const AllRooms = ({ positonLeft = "0" }) => {
  const { getRoom, room, err, rooms, getAllRooms, roomPass, setRoomPass } =
    useRoom();

  useEffect(() => {
    console.log("here rooms", rooms);
  }, [rooms]);
  return (
    <div
      className={`custom-blur xl:absolute sm:mb-96 sm:mt-5 flex flex-col z-50 justify-start items-center h-1/3 top-2 ${
        positonLeft ? "left-4 top-28" : "right-4"
      }`}
    >
      <h3 className="text-cyan-600 text-2xl">live rooms</h3>
      <div className="mt-4 flex flex-col gap-4 h-max sm:h-48 float-right overflow-y-scroll scrollbar-none">
        {rooms?.map((room,index) => {
          return (
            <div key={room?._id||index} className="text-green-500 flex mt-2 text-xl underline flex-col p-1 pr-3">
              <NavLink
                to={`/dashboard?room_id=${room?._id}`}
                onClick={() => {
                  setRoomPass(room?._id);
                  localStorage.setItem("roomkey", room?._id);
                }}
              >
                {room?.title || ""}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllRooms;
