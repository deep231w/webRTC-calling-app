import Image from 'next/image';

export  function Navbar (){
    const user= JSON.parse(localStorage.getItem("user")|| "{}");

    return(
        <div className="mx-3 my-3 shadow-xl/10 border rounded-xl border-solid ">
            <div className="px-5 py-3 flex justify-between">
                <div>
                    {user.name}
                </div>
                <div>
                    <Image
                        src="/user.png" 
                        alt="Profile" 
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}