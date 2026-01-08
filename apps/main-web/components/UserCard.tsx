import Image from "next/image"

interface UserCardProps{
    name:string
    isOnline:boolean
    onClickToCall:()=>void
}
export function UserCard({name, isOnline, onClickToCall}:UserCardProps){
    return(
        <div className={` flex justify-between ${isOnline ? "bg-green-400" : "bg-red-400"} rounded-md p-1`}>
            <div className="flex items-center gap-2">
                <Image
                   src="/person.png" 
                    alt="Profile" 
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer" 
                />    
                {name}   
            </div>
            <div
                onClick={onClickToCall}
            >
                <Image
                   src="/call.png" 
                    alt="Profile" 
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer" 
                />    
            </div>
        </div>
    )
}