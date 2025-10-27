import React from "react";

const Hero: React.FC = () => (
  <section className="bg-gradient-to-r from-indigo-50 to-white py-16">
  <div className="container-custom grid md:grid-cols-2 gap-10 items-center"></div>
    <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Find your perfect stay — effortless booking, unforgettable stays.
        </h2>
        <p className="mt-4 text-gray-600">
          Search hotels, compare rooms, and book in seconds. Trusted by travelers worldwide.
        </p>

        <div className="mt-6 flex gap-3">
          <input aria-label="Search city or hotel" className="px-4 py-3 rounded-md border w-full md:w-[360px]" placeholder="City, hotel or landmark" />
          <button className="px-4 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700">Search</button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-[420px] rounded-xl overflow-hidden shadow-lg">
          <img src="https://images.unsplash.com/photo-1501117716987-c8e9f0d02ff0?q=80&w=1200&auto=format&fit=crop" alt="hotel" className="w-full h-64 object-cover" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
