import {createContext, ReactNode, useContext, useMemo} from 'react';

interface PeerContextType{
    peer:RTCPeerConnection | null;
}

const PeerContext=createContext<PeerContextType | null>(null);


export const PeerProvider=({children}:{children:ReactNode})=>{

    const peer=useMemo(()=>new RTCPeerConnection({
        iceServers:[
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
            { urls: "stun:stun2.l.google.com:19302" },
            { urls: "stun:stun3.l.google.com:19302" },
            //TURN SERVER (free)
            {
                urls: "turn:relay1.expressturn.com:3478",
                username: "efree",
                credential: "efree",
            },
        ]
    }),[]);
    

    return(
        <PeerContext.Provider value={{peer}}>
            {children}
        </PeerContext.Provider>
    )
}

export const usePeer =()=>{
    const context= useContext(PeerContext)
    if(!context) throw new Error("usePeer must be used within a peerPeovider");

    return context;
}