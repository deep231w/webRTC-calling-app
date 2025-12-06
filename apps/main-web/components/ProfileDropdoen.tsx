import { Button } from "./ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";

export default function ProfileDropdown(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Image
                        src="/user.png" 
                        alt="Profile" 
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                    />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                        Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}