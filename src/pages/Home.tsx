import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { RoomList } from "../components/roomHome/RoomList";
import { ReviewSection } from "../components/reviews/ReviewSection";

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

          {/* SCROLL LINK */}
          <ScrollLink
            to="rooms-section"
            smooth={true}
            duration={800}
            offset={-50}
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
          <p className="text-xl md:text-2xl text-stone-600 font-light italic mb-8">
            "Handpicked luxury for your perfect stay"
          </p>

          <ScrollLink
            to="reviews-section"
            smooth={true}
            duration={800}
            offset={-50}
            className="cursor-pointer bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 px-7 rounded-lg transition duration-300 shadow-xl mt-6"
          >
            See Our Guest Stories
          </ScrollLink>
        </div>
        <RoomList />
      </div>

      {/* SECTION 3: REVIEWS */}
      <div
        id="reviews-section"
        className="bg-stone-100 py-24 px-4 overflow-hidden border-t border-amber-900/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-amber-900 mb-4">
              Guest Stories
            </h2>
            <p className="text-amber-700 font-serif italic text-lg">
              Memories shared by our beloved guests
            </p>
          </div>

          <ReviewSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
