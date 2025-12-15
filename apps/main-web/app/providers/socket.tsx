'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { io ,Socket} from 'socket.io-client';

interface SocketContextType{
    socket:Socket | null
}

const SocketContext= createContext<SocketContextType | null>(null)

export function SocketProvider({children}:{children:ReactNode}){
    const socketRef= useRef<Socket | null>(null);

    // const socket= useMemo(()=>io('http://localhost:5000'),[])

    useEffect(()=>{
        if(!socketRef.current){
            socketRef.current=io('http://localhost:5000');
        }

        return ()=>{
            socketRef.current?.disconnect();
            socketRef.current=null;
        }
    },[])
    

    return <SocketContext.Provider value={{socket :socketRef.current}}>
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