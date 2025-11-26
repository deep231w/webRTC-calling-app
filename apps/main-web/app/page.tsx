"use client"

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
export default function Home() {

  const user= JSON.parse(localStorage.getItem("user")|| "{}");
  
  console.log("user= ", user)
  const users=[
    {
      id:1,
      name:"Deepak Maharana",
    },{
      id:2,
      name:"Sumit Maharana"
    },{
      id:3,
      name:"Raju Bro"
    },{
      id:4,
      name:"Jayi Bhujubala"
    }
  ]

  return (
    <>
      <Navbar/>
        {users.map((user)=>(

          <div key={user.id} className="px-5 py-5">
            <UserCard name={user.name}/>
          </div>

        ))}
    </>
  );
}
