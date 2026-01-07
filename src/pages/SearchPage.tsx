import RoomSearch from "../components/roomSearch/RoomSearch";
import React from "react";

const SearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-10">
        <RoomSearch />
      </div>
    </div>
  );
};

export default SearchPage;
