import React, { useState } from "react";
import Hero from "../../components/Hero";
import RoomCard from "../../components/RoomCard";
import { Room } from "../../types";

const sampleRooms: Room[] = [
  { id: "r1", title: "Deluxe Room", description: "Spacious room with sea view", price: 4200, beds: 1, guests: 2, images: [], rating: 4.6 },
  { id: "r2", title: "Family Suite", description: "Two bedrooms + living area", price: 7800, beds: 3, guests: 4, images: [], rating: 4.8 },
  { id: "r3", title: "Single Standard", description: "Comfortable single room", price: 2200, beds: 1, guests: 1, images: [], rating: 4.1 },
];

const Home: React.FC = () => {
  const [rooms] = useState(sampleRooms);

  const handleBook = (room: Room) => {
    alert(`Booking ${room.title} — integrate booking modal or route here`);
  };

  return (
    <>
      <Hero />
      <section className="container-custom py-10">
        <h2 className="text-2xl font-semibold mb-6">Available rooms</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(r => <RoomCard key={r.id} room={r} onBook={handleBook} />)}
        </div>
      </section>
    </>
  );
};

export default Home;
