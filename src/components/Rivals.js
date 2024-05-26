/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import man from "../assets/man.png";
import man2 from "../assets/man2.png";
import gif1 from "../assets/365.gif";
import gif2 from "../assets/4M57.gif";
import axios from "../Config/axios";
import { useRoom } from "../Context/RoomProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthProvider";
import vote7 from "../assets/vote7.jpg";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
const Rivals = () => {
  const location = useLocation();
  const { room, setRoom, roomPass, getRoom, rooms } = useRoom();

  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [rivalsData, setRivalsData] = useState(room);
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getRoom();
  }, []);

  useEffect(() => {
    setLoading(true);
    let id = searchParams.get("room_id") || roomPass;

    axios
      .get(`/voterroom/${id}`)
      .then((res) => {
        console.log(res, "with values");

        if (res.status === 202) {
          setRivalsData({ ...res.data, winnerDeclared: true });
          console.log({ ...res.data.winner, winnerDeclared: true });
        } else {
          console.log(res.data, "with values");
          setRivalsData(res?.data);
        }
      })
      .catch((err) => {
        setRoom(null);

        toast.error(`${err.response.data.msg}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .finally(() => setLoading(false));
  }, [voted]);

  const voteCasting = (rivalsgmail) => {
    const roomId =
      searchParams.get("room_id") ||
      localStorage.getItem("roomkey") ||
      roomPass;
    axios
      .patch(`/voterroom/update/${roomId}`, {
        rivals: room.rivals,
        rivalGmail: rivalsgmail,
        voterGmail: user.email,
      })
      .then((res) => {
        setRoom(res.data?.room);
        toast.success(`voted to ${rivalsgmail}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) =>
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        })
      )
      .finally(() => {
        setVoted(!voted);
      });
  };

  return (
    <div className="mt-4">
      {!rivalsData?.title && !loading ? (
        <>
          <h1 className="text-white text-center text-3xl capitalize">
            no room is joined {console.log(rivalsData, "no room is joined")}
          </h1>
          <NavLink
            to="/joinAVoting"
            className="text-black bg-yellow-400 p-2 rounded-lg font-semibold absolute top-50 right-20"
          >
            Join A New Voting
          </NavLink>
        </>
      ) : !room?.title && loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex  flex-col justify-center items-center">
            <p className="text-3xl text-white my-4 -mt-4 ml-12 capitalize">
              share the key of this room --&gt;
              <span className="text-xl mx-4 text-red-500 font-semibold">
                {localStorage.getItem("roomkey")}
              </span>{" "}
            </p>

            <h1 className="text-4xl mt-3 mb-4 text-cyan-500 shadow shadow-white p-1 px-2 text-center">
              {" "}
              {room.title || rivalsData.title}
            </h1>
            <div className="w-fit flex flex-col justify-center items-center gap-20 flex-wrap my-8">
              <div>
                {rivalsData?.winnerDeclared &&
                  rivalsData?.winner.map((participant) => {
                    return (
                      <div
                        style={{ marginBottom: "-102px" }}
                        className="flex items-center flex-col justify-center w-fit"
                      >
                        <h1 className="text-2xl text-white capitalize ">
                          your winner{" "}
                          <span className="text-green-500 font-semibold">
                            {participant?.name}
                          </span>{" "}
                          with
                          <span className="text-green-500 font-semibold">
                            {" "}
                            {participant?.count}
                          </span>{" "}
                          votes
                        </h1>

                        <div
                          style={{
                            background: `url(${vote7})`,
                            backgroundSize: "contain",
                          }}
                          className="my-8 flex items-center justify-center h-96 w-full "
                        >
                          <img
                            style={{ marginRight: "-120px" }}
                            className="rounded-full z-10"
                            src={gif2}
                            height={320}
                            width={150}
                          />
                          <div>
                            <div
                              key={participant?._id}
                              className="w-fit h-fit m-4 flex sm:flex-col xl:flex-row md:flex-row lg:flex-row gap-2 text-black px-8 items-center justify-center rounded-md mx-2"
                            >
                              <div className="w-52 h-52 overflow-hidden p-0 border-3 rounded-lg border-yellow-50 mt-1 bg-white flex flex-col text-black  items-center justify-center shadow ">
                                <img
                                  src={participant?.img || man}
                                  className="w-full h-full"
                                />
                              </div>

                              <div className=" text-center text-white font-semibold text-lg px-1">
                                <h2 className="px-1 capitalize flex items-center justify-center gap-4 shadow-md my-2 shadow-amber-300  max-w-xs break-words">
                                  no. of votes{" "}
                                  <span className="text-black text-2xl">
                                    {participant?.count}
                                  </span>
                                </h2>
                                <h2 className="px-1 capitalize  shadow-md my-4 shadow-red-300  max-w-xs break-words ">
                                  {participant?.name}
                                </h2>
                                <h2 className="px-1  shadow-md my-4 max-w-xs break-words shadow-pink-300">
                                  {participant?.email}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <img
                            style={{ marginLeft: "-123px" }}
                            className="rounded-full z-10"
                            src={gif2}
                            height={320}
                            width={150}
                          />
                        </div>
                        {/* <img src={gif1} height={120} width={450} /> */}
                      </div>
                    );
                  })}
              </div>
              <div className="flex items-center justify-center md:flex-row flex-col">
                {(rivalsData?.rivals
                  ? rivalsData?.rivals
                  : rooms?.find((itm) =>
                      itm.rivals?.some((rival) =>
                        rivalsData?.winner?.some(
                          (winnerItem) => winnerItem._id === rival._id
                        )
                      )
                    )?.rivals
                )?.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="px-8 w-fit h-fit m-4 bg-purple-900 flex flex-col text-black items-center justify-center shadow-sm shadow-green-300 rounded-md mx-2"
                    >
                      <div className="w-44 h-44 overflow-hidden p-0 border-3 rounded-full border-yellow-50 mt-1 bg-white flex flex-col text-black  items-center justify-center shadow ">
                        <img src={item.img || man} className="w-full h-full " />
                      </div>

                      <div className=" text-center text-white font-semibold text-lg px-1">
                        <h2 className="px-1 capitalize shadow-sm my-4 shadow-violet-300  max-w-xs break-words flex items-center justify-center gap-2">
                          no. of votes{" "}
                          <span className="text-red-700 text-2xl">
                            {item.count}
                          </span>
                        </h2>
                        <h2 className="px-1 capitalize shadow-sm my-4 shadow-orange-300  max-w-xs break-words ">
                          {item.name}
                        </h2>
                        <h2 className="px-1 shadow-sm my-4 max-w-xs break-words shadow-blue-300">
                          {item.email}
                        </h2>
                      </div>

                      <button
                        onClick={() => voteCasting(item.email)}
                        className="p-1 my-2 px-4 text-white bg-blue-500 rounded-lg text-xl"
                      >
                        Cast Your Vote 🗳️
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Rivals;
