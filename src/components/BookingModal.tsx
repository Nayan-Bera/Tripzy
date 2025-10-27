import React from "react";
import { Room } from "../types";

export const BookingModal: React.FC<{room?: Room; onClose: () => void}> = ({ room, onClose }) => {
  if (!room) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">Book: {room.title}</h3>
        <p className="text-sm text-gray-600 mt-2">Price: ₹{room.price} / night</p>
        <form className="mt-4 space-y-3">
          <input className="w-full px-3 py-2 rounded-md border" placeholder="Full name" />
          <input className="w-full px-3 py-2 rounded-md border" placeholder="Email" />
          <div className="flex gap-3">
            <input className="flex-1 px-3 py-2 rounded-md border" placeholder="Check-in" />
            <input className="flex-1 px-3 py-2 rounded-md border" placeholder="Check-out" />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-md border">Cancel</button>
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
