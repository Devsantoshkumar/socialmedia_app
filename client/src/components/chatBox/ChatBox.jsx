import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { addMessage, getMessages } from '../../api/MessageRequest';
import { getUser } from '../../api/UserRequest';
import "./chatbox.css"
import {format} from 'timeago.js';
import InputEmoji from 'react-input-emoji';

const ChatBox = ({chat, currentUser, setSendMessage, receiveMessage}) => {

  const [userData, setUserData] = useState(null);
  const [massages, setMassages] = useState([]);
  const [newMassage, setNewMassage] = useState("");
  const scroll = useRef()

  useEffect(()=>{
      if(receiveMessage !== null && receiveMessage.chatId === chat._id){
        setMassages([...massages,receiveMessage])
      }
  },[receiveMessage])

  useEffect(()=>{
    const userId = chat?.members?.find((id)=>id!==currentUser);
    const getUserData = async()=>{
        try {
          const {data} = await getUser(userId);
          setUserData(data);
        } catch (error) {
           console.log(error);
        }
      };
      if(chat !== null) getUserData();
  },[chat, currentUser]);

  useEffect(()=>{
    const fetchMessages = async () =>{
        try {
            const {data} = await getMessages(chat._id);
            setMassages(data);
        } catch (error) {
            console.log(error);
        }
    }
    if(chat !== null) fetchMessages();
  },[chat])

  const handleChange = (newMassage) =>{
     setNewMassage(newMassage);
  }

  const handleSend = async (e) =>{
     e.preventDefault();
     const message = {
      senderId : currentUser,
      text: newMassage,
      chatId: chat._id,
     };
     // send message to the database
     try {
        const {data} = await addMessage(message);
        setMassages([...massages, data])
        setNewMassage("");
     } catch (error) {
         console.log(error)
     }


     // send message to socket server
     const receiverId = chat.members.find((id)=>id!==currentUser);
     setSendMessage({...message, receiverId});
  }


  // always scroll to the last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  },[massages])

  return (
    <>
    <div className='ChatBox-container'>
        {chat ? (
            <>
              <div className="chat-header">
            <div className='headerchat'>
                <img
                src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                alt="Profile"
                className="followerImage"
                style={{ width: "40px", height: "40px" }}
                />
                <div className="name" style={{fontSize: "0.8rem"}}>
                    <span>{userData?.firstname} {userData?.lastname}</span>
                </div>
            </div>
            </div>
            <div className="chat-body">
                {
                    massages.map((message)=>(
                        <>

                          <div ref={scroll}
                          className={message.senderId === currentUser ? "message own" : "message"}>
                            <span>{message.text}</span>
                            <span>{format(message.createdAt)}</span>
                          </div>
                        </>
                    ))
                }
            </div>
            <div className="chat-sender">
                <div style={{display: "none"}}>+</div>
                <InputEmoji value={newMassage} onChange = {handleChange} />
                <div className="send-button button" style={{padding: "0.9rem 0.7rem"}} onClick={handleSend}>SEND</div>
            </div>
            </>
        ) : <span className='chatbox-empty-message'>Tap on the chat and start conversation</span>}
    </div>
    </>
  )
}

export default ChatBox