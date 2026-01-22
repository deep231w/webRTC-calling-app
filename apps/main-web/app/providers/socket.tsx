'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io ,Socket} from 'socket.io-client';

interface SocketContextType{
    socket:Socket | null
}

const SocketContext= createContext<SocketContextType | null>(null)

export function SocketProvider({children}:{children:ReactNode}){
    //using state to store socket 
    // const [socket , setScoket] =useState<Socket | null>(null);

    // useEffect(()=>{
    //     const s= io('http://localhost:5000');
    //     setScoket(s)

    //     return ()=>{
    //         s.disconnect();
    //     }
    // },[])

    //USING REF TO STORE SOCKET
    const socketRef= useRef<Socket | null>(null);

    // const socket= useMemo(()=>io('http://localhost:5000'),[])
    if (!socketRef.current) {
        socketRef.current = io('http://localhost:5000', {
        transports: ['websocket'],
        });
    }


    useEffect(()=>{
        const socket =socketRef.current;

        return ()=>{
            socket?.disconnect();
            socketRef.current=null;
        }
    },[])
    

    return <SocketContext.Provider value={{socket:socketRef.current }}>
                {children}
            </SocketContext.Provider>
}



export const useSocket=()=>{
    const context= useContext(SocketContext);
    if(!context){
        throw new Error("useSocket must be used within a SocketProvider")
    }

    return context;
}