import { useRouter } from "next/navigation";
import CallerIdComponent from "./CallerIdComponent";

interface CallInfoModalProps {
  onClose: () => void;
  onAccept:()=>void;
  onReject:()=>void;
  callerName:string
}

export default function CallInfoModal({ onClose ,callerName ,onAccept,onReject }: CallInfoModalProps) {

  console.log("caller name in callerinfomodal-", callerName);

  const router= useRouter();
  const handleAccept= ()=>{
    const roomId= crypto.randomUUID();
    router.push(`/call/${roomId}`);
  }
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      <div className="fixed z-50 top-1/2 left-1/2 
                      -translate-x-1/2 -translate-y-1/2
                      bg-white p-4 rounded shadow-md w-80">
        <CallerIdComponent 
          onAccept={onAccept} 
          onClose={onClose || onReject}
          callerName={callerName}

        />
      </div>
    </>
  );
}
