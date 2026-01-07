"use client"
import { useParams } from "next/navigation";
// interface PageProps{
//     params:Promise<{
//         roomid:string
//     }>
// }

export default function (){
    const params= useParams();
    const roomid=params.roomid as string;

    return(
        <div>
            Welcome to room {roomid}
        </div>
    )
}