import React, { useState, useEffect, useRef } from 'react';
import { firestore, db } from '../firebase/Config';
import firebase from 'firebase/app';
import { auth } from '../firebase/Config';
import { useCollectionData, } from 'react-firebase-hooks/firestore';
import userlogo from "../assets/userlogo.png"
import { useAuth } from '../Context/AuthProvider';
import { BiSend } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import { useRoom } from '../Context/RoomProvider';

function ChatBox() {

  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const { room } = useRoom()
  const { logout, login, user } = useAuth()
  const [input, setInput] = useState('');
  let rmkey = localStorage.getItem("roomkey")
  // const [messages, setMessages] = useState([])
  const [msgSent, setMsgSent] = useState(false)

const query = firestore.collection("messages").orderBy("createdAt")

  const [messages] = useCollectionData(query, { roomId: rmkey });

  // console.log(messages);
// setMessages2(messages)
//   let filtered = messages2.filter(e => e.createdAt > Date.now());

//   filtered.sort((a, b) => b.startDate - a.startDate);

  const dummy = useRef();

  // useEffect(() => {
  //   const getMsgs = async () => {
  //     console.log(rmkey, "fsdf");

  //      await firestore.collection("messages").where('roomId', '==', rmkey).orderBy('createdAt').get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //        let ss= doc.data()
  //         console.log(doc.data());
  //         var msg = doc.data();
  //         // messages.push(doc.data())
  //         // setMessages(messages)
  //         setMessages((prev)=>[...prev,msg])
          
  //       });
  //     });
  //   }

  //   console.log(messages);


   

  //   return ()=>{

  //     getMsgs();
  //   }
  // },[msgSent]);




  const handleSubmit = async (e) => {
    setSubmit(true)
    e.preventDefault();
  
    const { uid, photoURL } = auth.currentUser;

    await firestore.collection("messages").add({
      text: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      roomId: rmkey,
      photoURL, uid
    })
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    setInput('');
    // setMessages([])
    setMsgSent(!msgSent)


  };

  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
      {/*  message ${messageClass} */}
      <div className={`flex flex-col justify-center items-start `}>
        <div className=' flex items-center justify-between text-white my-5 w-fit pr-4 rounded-full font-semibold'>

          <img className='h-8 w-8 rounded-full' referrerPolicy='no-referrer' src={photoURL || userlogo} />
          <p className='max-w-xs break-words ml-2 border-2 border-cyan-300 shadow-sm rounded-xl px-3 shadow-green-500'>{text}</p>
        </div>
      </div>
    </>)
  }
  // function ChatMessage(props) {
  //   console.log(props);
  //   const { text, uid, photoURL } = props.message;
  //   // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  //   return (<>
  //     {/*  message ${messageClass} */}
  //     <div className={`flex flex-col justify-center items-start `}>
  //       <div className=' flex items-center justify-between text-white my-5 w-fit pr-4 rounded-full font-semibold'>

  //         <img className='h-8 w-8 rounded-full' referrerPolicy='no-referrer' src={photoURL || userlogo} />
  //         <p className='max-w-xs break-words ml-2 border-2 border-cyan-300 shadow-sm rounded-xl px-3 shadow-green-500'>{text}</p>
  //       </div>
  //     </div>
  //   </>)
  // }



  return (<>
    {
      user &&
      <>
        <main className='flex flex-col items-center justify-c mb-24'>

          <div className='mt-4 border-2 shadow-lg mb-5 shadow-white border-cyan-300 p-3 rounded-xl h-96 overflow-y-scroll w-3/5 max-w-6xl scrollbar-none'>
          
           {/* {messages && messages.map(msg =>
              <ChatMessage key={uuidv4()} message={msg} />
            )} */}
           {messages && messages.map(msg =>
              <ChatMessage key={uuidv4()} message={msg} />
            )}

            {
             messages?.length<=0 && <h1 className='text-white text-2xl text-center'>chat with everyone in this room 😄</h1>
            }

            <span ref={dummy}>

            </span>
          </div>
          <div className='flex justify-center'>


            <form onSubmit={handleSubmit} className="pt-2 w-fit p-2 ">
              <div className='flex items-center'>

                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="bg-white text-blackc p-3 my-1 rounded-xl w-80 "

                />
                <button type="submit" className='bg-blue-800 text-white p-2 rounded-lg mx-1'><BiSend className='text-4xl' /></button>
              </div>

            </form>
          </div>
        </main>

      </>

    }

  </>
  );
}

export default ChatBox;
