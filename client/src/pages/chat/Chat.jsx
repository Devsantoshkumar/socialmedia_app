import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import Coversation from '../../components/coversation/Coversation';
import Header from '../../components/topheader/Header';
import "./chat.css";

const Chat = () => {

  const {user} = useSelector((state)=>state.AuthReducer.authData);
  const [chats, setChats] = useState([]);

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
  return (
    <>
    <Header/>
    <div className="Chat">
        <div className="Left-side-chat">
            <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
                {chats.map((chat)=>(
                   <div>
                       <Coversation data ={chat} currentUserId = {user._id} />
                   </div>
                ))}
            </div>
            </div>
        </div>
        <div className="Right-side-chat">
            Right chat
        </div>
    </div>
    </>
  )};
export default Chat