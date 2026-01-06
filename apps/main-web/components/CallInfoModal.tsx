interface CallInfoModalProps {
  onClose: () => void;
}

export default function CallInfoModal({ onClose }: CallInfoModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      <div className="fixed z-50 top-1/2 left-1/2 
                      -translate-x-1/2 -translate-y-1/2
                      bg-white p-4 rounded shadow-md w-80">
        <p className="mb-4">Incoming call from Deepak</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Reject
          </button>
          <button
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </>
  );
}
