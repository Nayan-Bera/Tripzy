import React from "react";
import { Room } from "../types";

const RoomCard: React.FC<{room: Room; onBook?: (r: Room) => void}> = ({ room, onBook }) => {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="h-44 md:h-52 w-full bg-gray-100">
        <img src={room.images?.[0] ?? "https://picsum.photos/600/400"} alt={room.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{room.title}</h3>
          <div className="text-indigo-600 font-bold">₹{room.price}</div>
        </div>

        <p className="text-sm text-gray-500 mt-2 flex-1">{room.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {room.beds} beds · {room.guests} guests
          </div>
          <div>
            <button onClick={() => onBook?.(room)} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Book</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
