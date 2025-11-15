'use client'

import { useCallback, useEffect,useState ,useRef} from "react";
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

    const myVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);


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
        setRemoteSocketId(from);
        console.log("A 's socket id stored in B's side -", from);

        console.log("call answered frrom the user -", from);
        socket?.emit('call_accept',{to:from, answer});

        // if(peer){
        //   peer.onicecandidate=(e)=>{
        //     if(e.candidate){
        //       socket?.emit('send_candidate',{to:remoteSocketId, candidate:e.candidate});

        //       console.log("ice candidate sent- ",e.candidate);
        //     }
        //   }
        // }
      }

      const handleCallAccepted= async({from ,answer}:{from :string , answer:RTCSessionDescriptionInit})=>{
         saveAnswer(answer);
         console.log("answer saved on user A 's localwebrtc store");
         setRemoteSocketId(from);

        //  if(peer){
        //   peer.onicecandidate=(e)=>{
        //     if(e.candidate){
        //       socket?.emit('send_candidate',{to:from, candidate:e.candidate});

        //       console.log("ice candidate sent- ",e.candidate);
        //     }
        //   }
        // }
      }

      useEffect(() => {
        if (!peer || !socket) return;

        peer.onicecandidate = (e) => {
          if (e.candidate && remoteSocketId) {
            socket.emit("send_candidate", { to: remoteSocketId, candidate: e.candidate });
            console.log(" Sent ICE candidate:", e.candidate);
          }
        };

        handleSendStream();
        
      }, [peer, socket, remoteSocketId]);


      const handleRecieveCandidate= async(candidate:RTCIceCandidate)=>{
        
        await peer?.addIceCandidate(new RTCIceCandidate(candidate));
        
      }

      useEffect(() => {
        if (!peer) return;
        peer.onconnectionstatechange = () => {
          console.log("Connection state:", peer.connectionState);
        };
      }, [peer]);

        // 🎥 Send and receive media streams
      const handleSendStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach((track) => peer?.addTrack(track, stream));

    // show my video
        if (myVideoRef.current) myVideoRef.current.srcObject = stream;

        peer.ontrack = (event) => {
        const [remoteStream] = event.streams;
        console.log(" Remote stream received");
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
        };
      };

      useEffect(() => {
        if (!peer) return;

        peer.ontrack = (event) => {
          const [remoteStream] = event.streams;
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          console.log("Remote stream set!");
        };
      }, [peer]);


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

         {remoteSocketId && <Button onClick={handleSendStream}>Send stream</Button>}

         <div className="flex gap-6 mt-6">
          
            <video ref={myVideoRef} autoPlay playsInline muted className="w-60 border rounded-lg" />
            <video ref={remoteVideoRef} autoPlay playsInline className="w-60 border rounded-lg" />
          </div>

        </div>
    )
}

export default Room;