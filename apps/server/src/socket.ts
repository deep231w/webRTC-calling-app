import { Server } from "socket.io";
import type {Server as HttpServer} from 'http';

const socketToEmailMap =new Map();
const emailToSocketMap= new Map();

export function InitSocket(server:HttpServer){
    const io= new Server(server,{
        cors:{origin:"*"}
    })

    io.on("connection",(socket)=>{
        console.log("socket connected - ", socket.id);

        socket.on("join-room",(email:string, room:string)=>{
            console.log("joined room user - ", email, room);
            socketToEmailMap.set(socket.id , email);
            emailToSocketMap.set(email, socket.id);

            io.to(room).emit('room_joined',{email ,id:socket.id});
            socket.join(room);
            io.to(socket.id).emit('join_room',{email ,room})
        })

        socket.on("disconnect",()=>{
            console.log("client disconnected -", socket.id);
        })
    })
}