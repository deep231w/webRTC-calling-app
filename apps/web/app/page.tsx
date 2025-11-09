'use client';

import React, { useState } from "react";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useRouter } from "next/navigation";
import { useSocket } from "../providers/Socket";

export default function Home() {
  const [email, setEmail]=useState("");
  const [roomId , setRoomId]=useState("");
  const router =useRouter();
  const {socket}=useSocket();

  const joinRoom= ()=>{
    if(!email || !email) {
      alert('please fill the credentials!')
      return;
    }

    socket?.emit("join-room",email , roomId);
    
    router.push(`/room/${roomId}`);
  }

  return (
    <div className="joinroom-component">
      <Input 
        placeholder={"Email"}
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
      />
      <Input 
        placeholder={"Room Id"}
        onChange={(e)=>setRoomId(e.target.value)}
        value={roomId}
      />
      <Button className="f" onClick={joinRoom} children={"Join room"} />
    </div>
  );
}
