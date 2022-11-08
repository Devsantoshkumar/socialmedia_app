import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import Coversation from '../../components/coversation/Coversation';
import Header from '../../components/topheader/Header';
import ChatBox from "../../components/chatBox/ChatBox"
import "./chat.css";
import {io} from "socket.io-client"

const Chat = () => {

  const {user} = useSelector((state)=>state.AuthReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  // send message to socket server
  useEffect(()=>{
         if(sendMessage !== null){
            socket.current.emit('send-message',sendMessage);

         }
  },[sendMessage])


  useEffect(()=>{
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add",user._id);
    socket.current.on('get-users',(users)=>{
        setOnlineUsers(users)
    })
  },[user])


    // receive message from socket server
    useEffect(()=>{
        socket.current.on("receive-message",(data)=>{
          setReceiveMessage(data);
        })
    },[])


  useEffect(()=>{
    const getChats = async()=>{
        try{
            const {data} = await userChats(user._id)
            setChats(data);
        }catch(error){
            console.log(error);
        }
    }
    getChats()
  },[user])


  const checkOnlineStatus = (chat) =>{
    const chatMember = chat.members.find((member)=>member !== user._id)
    const online = onlineUsers.find((user)=>user.userId === chatMember);
    return online ? true : false;
  }
  return (
    <>
    <Header/>
    <div className="Chat">
        <div className="Left-side-chat">
            <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
                {chats.map((chat)=>(
                   
                   <div onClick={()=>setCurrentChat(chat)}>
                       <Coversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                   </div>
                ))}
            </div>
            </div>
        </div>
        <div className="Right-side-chat">
             <ChatBox chat={currentChat} currentUser={user._id} receiveMessage ={receiveMessage} setSendMessage={setSendMessage}/>
        </div>
    </div>
    </>
  )};
export default Chat