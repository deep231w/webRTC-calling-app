"use client"
import { UsePeer } from "@/app/providers/peer";
import { useSocket } from "@/app/providers/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// interface PageProps{
//     params:Promise<{
//         roomid:string
//     }>
// }

export default function (){
    const params= useParams();
    const roomid=params.roomid as string;
    const {socket}=useSocket();
    const [user, setUser] = useState<any>(null);

    const {peer}=UsePeer();

    const [remoteUserId , setRemoteUserId]=useState<string | null>(null);

    useEffect(() => {
          const data = localStorage.getItem("user");
          console.log("data", data)
          if (data) {
              setUser(JSON.parse(data));
          }
    
    }, []);

    const onAccptedCallHandle= async({fromuserid ,roomid}:{fromuserid:string , roomid:string})=>{
        console.log("call accpted b's id and room id- ", fromuserid , roomid)
        setRemoteUserId(fromuserid);

        if(!peer){
            console.log("peer is not created");
            return;
        }

        console.log("creating offer--------")
        const offer= await peer.createOffer();
        await peer.setLocalDescription(new RTCSessionDescription(offer))
        console.log("offer created - ", offer);

        console.log("user ------", user)
        socket?.emit("peer:offer", {fromuserid:user._id , touserid:fromuserid , roomid, offer});
        console.log("peer:offer emmited- -----")
    }

    const handleOnRecieveOffer=async ({fromuserid , roomid , offer}:{fromuserid:string, roomid:string ,offer:RTCSessionDescription})=>{
        console.log(`offfer from A -${offer} , A's id- ${fromuserid} , roomId- ${roomid}` )

        if(!peer){
            console.log("peer is not created in recieveofferhandle ");
            return;
        }
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer=await peer.createAnswer();
        await peer.setLocalDescription(new RTCSessionDescription(answer));

        socket?.emit("peer:answer",{fromuserid:user._id,touserid:fromuserid, roomid ,answer })


    }
    
    const handleAnswerRecieve= async({fromuserid ,roomid , answer}:{fromuserid:string ,roomid:string , answer:RTCSessionDescription})=>{
        console.log("B accepted offer and here answer is - ", answer );

    }

    useEffect(()=>{
        if(!socket) return;

        socket?.on("call:callgotaccepted" ,onAccptedCallHandle);
        socket?.on("peer:recieve-offer", handleOnRecieveOffer);
        socket?.on("peer:onAnswer-recieve", handleAnswerRecieve)

        return ()=>{
            socket.off("call:callgotaccepted", onAccptedCallHandle);
            socket.off("peer:recieve-offer",handleOnRecieveOffer);
            socket.off("peer:onAnswer-recieve",handleAnswerRecieve);
        }

    },[socket, user ,peer])

    return(
        <div className="main-grid-wrapper ">
            {/* Welcome to room {roomid} */}
            <div className="grid-item-1">
                <div className="sub-grid-item">
                    <div className="">
                        screen 1
                    </div>
                    <h1 className="">Name A</h1>
                </div>
                <div className="sub-grid-item">
                    <div className="">
                        screen 2
                    </div>
                    <h1 className="">Name B</h1>
                </div>
            </div>
            <div className="grid-item-2">
                <button>End call</button>
            </div>
        </div>
    )
}