'use client'

import { useCallback, useEffect,useState } from "react";
import { usePeer } from "../../../providers/peer";
import { useParams } from "next/navigation";
import { useSocket } from "../../../providers/Socket";
import { Button } from "@repo/ui/button";
const Room= ()=>{
    const {socket}=useSocket();
    const {id}=useParams();
    const {peer,CreateAnswer,CreateOffer, saveAnswer}=usePeer();
    const [newUserEmail , setNewUserEmail]=useState<string | null>(null);
    const [remoteSocketId ,setRemoteSocketId]=useState<string | null>(null);

    const handleCreateOffer= useCallback(()=>{
      const offer=CreateOffer();

    },[])

    const handleJoinedUser= useCallback(
      async({email , id}:{email:string, id:string})=>{
        setNewUserEmail(email);
        setRemoteSocketId(id);
        // const offer =await CreateOffer();

        // socket?.emit('call_user',{id ,offer});
        console.log("new user joined -",email , id );

      },[socket ]);
    

      const handleCallUser= async()=>{
        const offer = await CreateOffer();
        console.log("called to user -", newUserEmail);

        socket?.emit('call_user',{id:remoteSocketId ,offer})

      }

      const handleAnswerCall= async({from , offer}:{from:string , offer :RTCSessionDescriptionInit})=>{
        const answer = await CreateAnswer(offer);

        console.log("call answered frrom the user -", from);
        socket?.emit('call_accept',{to:from, answer});

        if(peer){
          peer.onicecandidate=(e)=>{
            if(e.candidate){
              socket?.emit('send_candidate',{to:remoteSocketId, candidate:e.candidate});

              console.log("ice candidate sent- ",e.candidate);
            }
          }
        }
      }

      const handleCallAccepted= async({from ,answer}:{from :string , answer:RTCSessionDescriptionInit})=>{
         saveAnswer(answer);
         console.log("answer saved on user A 's localwebrtc store");
      }

      const handleRecieveCandidate= async(candidate:RTCIceCandidate)=>{
        
        await peer?.addIceCandidate(new RTCIceCandidate(candidate));
        
      }

    useEffect(()=>{
      socket?.on('room_joined',handleJoinedUser);
      socket?.on('incoming_call',handleAnswerCall);
      socket?.on('call_accepted',handleCallAccepted);
      socket?.on('recieve_candidate',handleRecieveCandidate)

      return()=>{
        socket?.off('room_joined',handleJoinedUser);
        socket?.off('incoming_call',handleAnswerCall);
        socket?.off("call_accepted",handleCallAccepted);
        socket?.off('recieve_candidate',handleRecieveCandidate);
      }
      
    },[handleCreateOffer])
    return(
        <div>
          <h1>welcome to the room {id}</h1>
         {newUserEmail && <p>new user connected :- {newUserEmail}</p>}
         {remoteSocketId && <Button onClick={handleCallUser} className="" >CALL</Button>}



        </div>
    )
}

export default Room;