import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest.js';
import Coversation from '../coversation/Coversation.jsx';
import {io} from "socket.io-client"

const TrendCard = () => {

    const {user} = useSelector((state)=>state.AuthReducer.authData);
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const socket = useRef();

    useEffect(()=>{
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add",user._id);
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users)
        })
      },[user])

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
    <div className='trendCard'>
        <h3>Online Users</h3>
        {
            chats.map((chat)=>{
                return(
                    <Coversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                )
            })
        }
    </div>
  )
}

export default TrendCard