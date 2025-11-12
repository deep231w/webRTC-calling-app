'use client';

import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react';

interface PeerContextType{
    peer:RTCPeerConnection | null;
    CreateOffer: () => Promise<RTCSessionDescriptionInit | null>;
    CreateAnswer: ( offer: RTCSessionDescriptionInit ) => Promise<RTCSessionDescriptionInit | null>;
    saveAnswer:(answer:RTCSessionDescriptionInit)=>void;
}

const PeerContext=createContext<PeerContextType | null>(null);


export const PeerProvider=({children}:{children:ReactNode})=>{

    // const peer=useMemo(()=>new RTCPeerConnection({
    //     iceServers:[
    //         { urls: "stun:stun.l.google.com:19302" },
    //         { urls: "stun:stun1.l.google.com:19302" },
    //         { urls: "stun:stun2.l.google.com:19302" },
    //         { urls: "stun:stun3.l.google.com:19302" },
    //         //TURN SERVER (free)
    //         {
    //             urls: "turn:relay1.expressturn.com:3478",
    //             username: "efree",
    //             credential: "efree",
    //         },
    //     ]
    // }),[]);

    const [peer, setPeer] = useState<RTCPeerConnection | null>(null);

    //  Create peer only in the browser after mount
    useEffect(() => {
        const newPeer = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            {
            urls: 'turn:relay1.expressturn.com:3478',
            username: 'efree',
            credential: 'efree',
            },
        ],
        });
        setPeer(newPeer);

        return () => {
        newPeer.close(); // cleanup on unmount
        };
    }, []);

    // const CreateOffer= async()=>{
    //     const offer= await peer.createOffer();
    //     peer.setLocalDescription(offer);

    //     return offer;
    // }

    // const CreateAnswer=async()=>{
    //     const answer=await peer.createAnswer();
    //     peer.setLocalDescription(answer);
    //     return answer;
    // }

    const CreateOffer = async () => {
        if (!peer) return null;
        const offer = await peer.createOffer();
        await peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    };

    const CreateAnswer = async (offer:RTCSessionDescriptionInit) => {
        if (!peer) return null;
        await peer.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
    };

    const saveAnswer= async(answer:RTCSessionDescriptionInit)=>{
        await peer?.setRemoteDescription(answer);
    }

    return(
        <PeerContext.Provider value={{peer,CreateOffer,CreateAnswer, saveAnswer}}>
            {children}
        </PeerContext.Provider>
    )
}

export const usePeer =()=>{
    const context= useContext(PeerContext)
    if(!context) throw new Error("usePeer must be used within a peerPeovider");

    return context;
}