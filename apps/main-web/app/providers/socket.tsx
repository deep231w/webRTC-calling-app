'use client';

import { createContext, ReactNode, useContext, useMemo } from "react";
import { io ,Socket} from 'socket.io-client';

interface SocketContextType{
    socket:Socket | null
}

const SocketContext= createContext<SocketContextType | null>(null)

export function SocketProvider({children}:{children:ReactNode}){
    const socket= useMemo(()=>io('http://localhost:5000'),[])

    return <SocketContext.Provider value={{socket}}>
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