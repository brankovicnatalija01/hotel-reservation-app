import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { RoomList } from "../components/roomHome/RoomList";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('images/background.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg tracking-tight animate-fade-in-up ">
            Pine Mountain Lodge
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up animation-delay-300">
            Experience the ultimate mountain retreat where luxury meets the
            wilderness.
          </p>

          {/* MODERAN SCROLL LINK */}
          <ScrollLink
            to="rooms-section" // Mora da se poklapa sa ID-jem ispod
            smooth={true}
            duration={800} // Brzina u milisekundama (800ms = 0.8s)
            offset={-50} // Ako imaš fiksni header, ovim ga zaobilaziš
            className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-xl"
          >
            Explore Our Rooms
          </ScrollLink>
        </div>
      </div>

      {/* SECTION 2: ROOMS */}
      <div id="rooms-section" className="min-h-screen bg-stone-200 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            Our Accommodations
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8 rounded-full "></div>
          <p className="text-xl md:text-2xl text-stone-600 font-light italic">
            "Handpicked luxury for your perfect stay"
          </p>
        </div>
        <RoomList />
      </div>
    </div>
  );
};

export default Home;
