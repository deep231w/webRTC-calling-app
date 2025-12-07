import { Server } from "socket.io";
import type {Server as HttpServer} from 'http';

const socketToEmailMap =new Map();
const emailToSocketMap= new Map();
const onlineUsers= new Map();

export function InitSocket(server:HttpServer){
    const io= new Server(server,{
        cors:{origin:"*"}
    })

    io.on("connection",(socket)=>{
        console.log("socket connected - ", socket.id);

        socket.on("user-connected", (userId)=>{
            onlineUsers.set(userId, socket.id)

            socket.emit("online-users", Array.from(onlineUsers.keys()));
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
        

        socket.on("disconnect",()=>{
            console.log("client disconnected -", socket.id);
            for (const [userId, sockId] of onlineUsers.entries()) {
                if (sockId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }

            io.emit("online-users", Array.from(onlineUsers.keys()));

        })
    })
}