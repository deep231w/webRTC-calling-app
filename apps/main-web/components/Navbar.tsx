"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProfileDropdown from './ProfileDropdoen';

export  function Navbar (){
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const data = localStorage.getItem("user");
        console.log("data", data)
        if (data) {
            setUser(JSON.parse(data));
        }

        console.log("user in nav0 ", user)
    }, []);


    return(
        <div className="mx-3 my-3 shadow-xl/10 border rounded-xl border-solid ">
            <div className="px-5 py-3 flex justify-between items-center">
                <div>
                    {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1) || "Guest"}
                </div>
                <div>
                    <ProfileDropdown/>
                </div>
            </div>
        </div>
    )
}