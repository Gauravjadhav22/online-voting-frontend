import React, { useState, useEffect, useRef } from "react";
import { firestore, db } from "../firebase/Config";
import firebase from "firebase/app";
import { auth } from "../firebase/Config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import userlogo from "../assets/userlogo.png";
import { useAuth } from "../Context/AuthProvider";
import { BiSend } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { useRoom } from "../Context/RoomProvider";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const gf = new GiphyFetch("QCUY9ApL0vYsBmnA2dH1dVg4SWPPe5VJ");

const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  return (
    <>
      <div className={`flex flex-col justify-center items-start `}>
        <div className=" flex items-center justify-between text-white my-5 w-fit pr-4 rounded-full font-semibold">
          <img
            className="h-8 w-8 rounded-full"
            referrerPolicy="no-referrer"
            src={photoURL || userlogo}
          />
          <p className="max-w-xs break-words ml-2 p-1 shadow rounded-xl px-3 shadow-green-400 text-2xl">
            {text}
          </p>
        </div>
      </div>
    </>
  );
}

function ChatBox() {
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const { room } = useRoom();
  const { logout, login, user } = useAuth();
  const [input, setInput] = useState("");
  let rmkey = localStorage.getItem("roomkey");
  const [msgSent, setMsgSent] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [showGifs, setShowGifs] = useState(false);

  const handleOpenPicker = () => {
    setIsPickerOpen(true);
  };

  const [messages] = useCollectionData(
    firestore
      .collection("messages")
      .where("roomId", "==", rmkey)
      .orderBy("createdAt")
  );

  const dummy = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const { uid, photoURL } = auth.currentUser;

    await firestore.collection("messages").add({
      text: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      roomId: rmkey,
      photoURL,
      uid,
    });
    dummy.current.scrollIntoView({ behavior: "smooth" });
    setInput("");
    // setMessages([])
    setMsgSent(!msgSent);
  };
  const handleEmojiSelect = (emoji) => {
    setInput((prevMessage) => prevMessage + emoji.native);
    setIsPickerOpen(false);
  };

  const handleGifSelect = (gif) => {
    // Process the selected GIF (e.g., send it as a message)
    console.log("Selected GIF:", gif);
  };

  return (
    <>
      {user && (
        <>
          <main className="flex flex-col items-center mb-24">
            <h1 className="text-2xl px-6 mt-4 text-cyan-300 shadow shadow-white">
              Chat Box
            </h1>
            <div className="mt-4 mb-12 p-3 rounded-xl h-96 overflow-y-scroll w-3/5 max-w-6xl scrollbar-none shadow shadow-white">
              {messages &&
                messages.map((msg) => (
                  <ChatMessage key={uuidv4()} message={msg} />
                ))}

              {messages?.length <= 0 && (
                <h1 className="text-white text-2xl text-center">
                  chat with everyone in this room 😄
                </h1>
              )}

              <span ref={dummy}></span>
            </div>
            <div className="flex justify-center">
              <form onSubmit={handleSubmit} className="pt-2 w-fit p-2 ">
                <div className="flex items-center">
                
                  {/* <div className="flex flex-col justify-center">
                    {!showGifs && (
                      <button className="text-gray-400 font-bold mr-4 tex-4xl" onClick={() => setShowGifs(true)}>Gif</button>
                    )}

                    {showGifs && (
                      <div className="h-80 overflow-y-scroll">
                      <Grid width={300} columns={2} fetchGifs={fetchGifs} onGifClick={(e)=>console.log("haa click ",e)} />
                  </div>

                    )}
                  </div> */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-white text-black p-3 my-1 rounded-xl w-80 "
                  />
                  <button
                    type="submit"
                    className="bg-blue-800 text-white p-2 rounded-lg mx-1 ml-2"
                  >
                    <BiSend className="text-4xl" />
                  </button>
                </div>
              </form>
              <div className="flex flex-col justify-center self-stretch">
                    {!isPickerOpen && (
                      <button
                        onClick={handleOpenPicker}
                        className="text-4xl mr-4"
                      >
                        😊
                      </button>
                    )}

                    {isPickerOpen && (
                      <div className="self-end absolute">
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                      </div>
                    )}
                  </div>
            </div>
          </main>{" "}
        </>
      )}
    </>
  );
}

export default ChatBox;
