import RoomSearch from "../components/roomSearch/RoomSearch";
import Navbar from "../components/Navbar";
import React from "react";

const SearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoomSearch />
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
