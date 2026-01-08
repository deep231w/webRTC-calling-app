import { Server } from "socket.io";
import type {Server as HttpServer} from 'http';

const socketToEmailMap =new Map();
const emailToSocketMap= new Map();
//
const onlineUsers= new Map();

export function InitSocket(server:HttpServer){
    const io= new Server(server,{
        cors:{origin:"*"}
    })

    io.on("connection",(socket)=>{
        console.log("socket connected - ", socket.id);
        console.log("users - ",Array.from(onlineUsers.values()) )

        socket.onAny((event ,...args)=>{
            console.log("event recieved - ", event, args)
        })

        socket.on("user-connected", (userId)=>{
            console.log("inside user-connected event and user id is - ", userId)
            console.log("new user online uid- ", userId)
            onlineUsers.set(userId, socket.id)
            console.log("current online users in connected socket - ", Array.from(onlineUsers.entries()));

            io.emit("online-users", Array.from(onlineUsers.keys()));
            
        })

        socket.on("join-room",(email:string, room:string)=>{
            console.log("joined room user - ", email, room);
            socketToEmailMap.set(socket.id , email);
            emailToSocketMap.set(email, socket.id);

            io.to(room).emit('room_joined',{email ,id:socket.id});
            socket.join(room);
            io.to(socket.id).emit('join_room',{email ,room})
        })

        socket.on("call_user",(data)=>{
            const {id,offer}=data;

            io.to(id).emit('incoming_call',{from:socket.id ,offer});

        })

        socket.on("call_accept",(data)=>{
            const {to ,answer}=data;

            io.to(to).emit("call_accepted",{from:socket.id, answer});

        })

        socket.on('send_candidate',(data)=>{
            const {to, candidate}=data;

            io.to(to).emit('recieve_candidate',{from:socket.id , candidate});
            
        })

        //calling functionality
        socket.on("call:send-call", ({roomid , touserid , fromuserid})=>{
            try{
                console.log("inside send-call event -- call sending from -------- ", fromuserid)
                const recieverSocketId= onlineUsers.get(touserid);
                console.log("reciever socket id- ", recieverSocketId)
                if(!recieverSocketId){
                    console.log("user is offline users userId- ", touserid);
                    return;
                }

                io.to(recieverSocketId).emit("call:incoming-call", {roomid , fromuserid});
            }catch(e){
                console.log("error during call event - ", e);
            }            
        })
        

        socket.on("disconnect",()=>{
            console.log("client disconnected -", socket.id);
            for (const [userId, sockId] of onlineUsers.entries()) {
                if (sockId === socket.id) {
                    console.log("user id offline - uid- ", userId)
                    onlineUsers.delete(userId);
                    break;
                }
            }

            io.emit("online-users", Array.from(onlineUsers.keys()));

            console.log("current online users - ", Array.from(onlineUsers.entries()));
        })
    })
}