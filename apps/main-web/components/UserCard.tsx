import Image from "next/image"
export function UserCard({name}:{name:string}){
    return(
        <div className=" flex justify-between">
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
            <div>
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