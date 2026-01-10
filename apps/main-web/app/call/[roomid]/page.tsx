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
        <div className="main-grid-wrapper ">
            {/* Welcome to room {roomid} */}
            <div className="grid-item-1">
                <div className="sub-grid-item">
                    <div className="">
                        screen 1
                    </div>
                    <h1 className="">Name A</h1>
                </div>
                <div className="sub-grid-item">
                    <div className="">
                        screen 2
                    </div>
                    <h1 className="">Name B</h1>
                </div>
            </div>
            <div className="grid-item-2">
                <button>End call</button>
            </div>
        </div>
    )
}