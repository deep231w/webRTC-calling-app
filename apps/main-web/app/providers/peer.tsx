'use client'

import { createContext, ReactNode, useContext } from "react"

interface PeerContextType{
    peer :RTCPeerConnection | null
}
const PeerContext= createContext<PeerContextType | null>(null);


export const PeerProvider= ({children}:{children :ReactNode})=>{


}


export const UsePeer = ()=>{
    const context= useContext(PeerContext);

    if(!context) throw new Error("usePeer must be used within a peerPeovider");

    return context;
}