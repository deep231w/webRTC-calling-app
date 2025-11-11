'use client'

import { useCallback, useEffect,useState } from "react";
import { usePeer } from "../../../providers/peer";
import { useParams } from "next/navigation";
import { useSocket } from "../../../providers/Socket";

const Room= ()=>{
    const {socket}=useSocket();
    const {id}=useParams();
    const {peer,CreateAnswer,CreateOffer}=usePeer();
    const [newUserEmail , setNewUserEmail]=useState<string | null>(null);

    const handleCreateOffer= useCallback(()=>{
      const offer=CreateOffer();

    },[])

    const handleJoinedUser= ({email , id}:{email:string, id:string})=>{
      setNewUserEmail(email);
    }
    socket?.on('room_joined',handleJoinedUser);

    useEffect(()=>{
      handleCreateOffer();
      
    },[handleCreateOffer])
    return(
        <div>
          <h1>welcome to the room {id}</h1>
         {newUserEmail && <p>new user connected :- {newUserEmail}</p>}

        </div>
    )
}

export default Room;