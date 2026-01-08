"use client"

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSocket } from "./providers/socket";
import CallInfoModal from "@/components/CallInfoModal";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse{
  message:string,
  users:User[]
}
export default function Home() {

  const [user, setUser] = useState<any>(null);
  const [users ,setUsers]=useState<any[]>([]);
  const {socket}=useSocket();
  const [gettingCall ,  setGettingCall]=useState(true);
  const router= useRouter();


  const [onlineUsersId ,setOnlineUsers]=useState<any[]>([]);

  useEffect(() => {
      const data = localStorage.getItem("user");
      console.log("data", data)
      if (data) {
          setUser(JSON.parse(data));
      }

  }, []);

  //online users track-
  useEffect(()=>{
    console.log("inside use effect")
    console.log("socket inside useeffect and user id - ",socket , user?._id);
    if(!socket || !user?._id){
      console.log("existing from useeffect -------")
      return;
    }

    console.log("before user socket connected check ")
    if(socket){
      console.log("isnide socket connected")
      socket?.emit('user-connected',user?._id);
      console.log("after user connected even emits .....")
    }
    

    const handleOnlineUsers= (users:any[])=>{
      setOnlineUsers(users);
    }

    socket?.on('online-users',handleOnlineUsers)

    return ()=>{
      socket?.off("online-users", handleOnlineUsers);
    }
  },[socket, user?._id])

  const fetchUsers= async ()=>{
    try{
      const response= await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`)

      console.log("response of fetch users- ", response);

      const users= response?.data?.users?.map((user)=>(
        {id:user._id ,name:user.name}
      ))

      setUsers(users);

      console.log("after mapped users- ", users);


    }catch(e){
      console.log("error during fetch users- ", e);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  //call a persion
  const handleCall=(senderuser:{id:string , name:string})=>{
    try{
      console.log("inside handlecall- ", socket , user._id)

      if(!socket || !user?._id){
        console.log("exiting from handle call ......");
        return;
      }
      console.log("call user details-", senderuser);
      const roomid= crypto.randomUUID();
      router.push(`/call/${roomid}`);    
      socket.emit("call:send-call", {roomid ,touserid:senderuser.id, fromuserid:user?._id })
      
    }catch(e){
      console.log("error in handlecall- ", e);
    }
  }

  useEffect(()=>{
    socket?.on("call:incoming-call", ({ roomid, fromuserid }) => {
      console.log("incoming call", roomid, fromuserid);
    });
    
    return ()=>{
      socket?.off("call:incoming-call");
      
    }
  },[socket])

  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-3 gap-4">
        {users
        .filter((u) => u.id !== user?._id)
        .map((user)=>(
            <div key={user.id} className="">
              <UserCard 
                name={user.name} 
                isOnline={onlineUsersId.includes(user.id)}
                onClickToCall={()=>handleCall(user)}

              />
            </div>
        ))}
      </div>

      {gettingCall &&
        <CallInfoModal onClose={()=>setGettingCall(false)}/>
      }

    </>
  );
}
