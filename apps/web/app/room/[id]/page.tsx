
interface RoomPageProps {
  params: {
    id: string;
  };
}


const Room=async ({params}:RoomPageProps)=>{
    const {id}=await params;
    return(
        <div>
            {`welcome to the room ${id}`}
        </div>
    )
}

export default Room;