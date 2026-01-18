import { useState, useEffect } from "react";
import { searchRooms } from "../../api/roomApi";
import { getAmenities } from "../../api/amenityApi";
import { AMENITY_ICONS } from "../../utils/amenityIcons";
import type { Amenity } from "../../types/amenity";
import RoomSearchCard from "../roomSearch/RoomSearchCard";
import FilterSidebar from "./FilterSidebar";
import type { Room } from "../../types/room";
import type { RoomSearchRequest } from "../../types/room";

const RoomSearch = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [allAmenities, setAllAmenities] = useState<Amenity[]>([]);

  const [filters, setFilters] = useState<RoomSearchRequest>({
    capacity: 1,
    minPrice: 0,
    maxPrice: 500,
    amenities: [],
    checkIn: undefined,
    checkOut: undefined,
  });

  useEffect(() => {
    const loadAmenities = async () => {
      const data = await getAmenities();
      setAllAmenities(data);
    };
    loadAmenities();
  }, []);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      try {
        const data = await searchRooms(filters);
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, [filters]);

  const handleAmenityToggle = (amenityName: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenityName)
        ? prev.amenities.filter((a) => a !== amenityName)
        : [...(prev.amenities || []), amenityName],
    }));
  };

  return (
    <div className="max-w-400 mx-auto px-4 py-8 flex flex-col md:flex-row gap-18">
      {/* 1. Filter Sidebar Container */}
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        allAmenities={allAmenities}
        onAmenityToggle={handleAmenityToggle}
        iconMap={AMENITY_ICONS}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-900 w-fit">
            {loading
              ? "Searching for rooms..."
              : `Found: ${rooms.length} rooms`}
            <div className="h-1.25 w-full bg-linear-to-r from-transparent via-amber-600 mt-1 rounded-full" />
          </h1>
        </div>

        {/* Room Results Grid */}
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {rooms.map((room) => (
              <RoomSearchCard
                key={room.id}
                room={room}
                iconMap={AMENITY_ICONS}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          !loading && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">
                No rooms match your selected criteria. Try adjusting your
                filters.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default RoomSearch;
