import { Server } from "socket.io";
import type {Server as HttpServer} from 'http';

export function InitSocket(server:HttpServer){
    const io= new Server(server,{
        cors:{origin:"*"}
    })

    io.on("connection",(socket)=>{
        console.log("socket connected - ", socket.id);

        socket.on("join-room",(email:string, room:string)=>{
            console.log("joined room user - ", email, room);


        })

        socket.on("disconnect",()=>{
            console.log("client disconnected -", socket.id);
        })
    })
}