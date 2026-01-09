interface CallInfoModalProps {
  onClose: () => void;
  onAccept:()=>void;
  callerName:string;
}

export default function CallerIdComponent({ onClose, onAccept ,callerName}: CallInfoModalProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-green-300 p-2">
      <span className="text-lg leading-none">
        {callerName}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          className="text-lg leading-none"
        >
          Reject
        </button>
        <button
            onClick={onAccept}
          className="text-lg leading-none"
        >
          Accept
        </button>
      </div>

    </div>
  );
}
