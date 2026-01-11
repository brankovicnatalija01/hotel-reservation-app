import React from "react";
import DateRangePicker from "./DateRangePicker";
import { ListFilterPlus, Users, Coins } from "lucide-react";
import AmenityFilter from "./AmenityFilter";
import type { RoomSearchRequest } from "../../types/room";
import type { Amenity } from "../../types/amenity";

interface FilterSidebarProps {
  filters: RoomSearchRequest;
  setFilters: React.Dispatch<React.SetStateAction<RoomSearchRequest>>;
  allAmenities: Amenity[];
  onAmenityToggle: (amenity: string) => void;
  iconMap: Record<string, React.ElementType>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  allAmenities,
  onAmenityToggle,
  iconMap,
}) => {
  return (
    <aside className="w-full md:w-80 bg-white p-10  rounded-2xl shadow-xl shadow-slate-100/50 border border-amber-100/50 h-fit sticky top-4 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 border-b border-amber-50">
          <ListFilterPlus size={22} className="text-amber-600" />
          <h2 className="text-2xl font-serif tracking-wide text-slate-800 italic">
            Filters
          </h2>
        </div>
        <div className="h-1.25 w-full bg-linear-to-r from-transparent via-amber-600 opacity-80" />
      </div>
      {/* Date Range Selection */}
      <div className="mb-10">
        <DateRangePicker
          checkIn={filters.checkIn}
          checkOut={filters.checkOut}
          onCheckInChange={(date) => setFilters({ ...filters, checkIn: date })}
          onCheckOutChange={(date) =>
            setFilters({ ...filters, checkOut: date })
          }
        />
      </div>

      {/* Capacity Slider */}
      <div className="mb-10">
        <label className="flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">
          <span className="flex items-center gap-2">
            <Users size={16} className="text-amber-600" /> Number of Guests
          </span>
          <span className="text-amber-700 font-bold text-sm">
            {filters.capacity}
          </span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={filters.capacity}
          onChange={(e) =>
            setFilters({ ...filters, capacity: parseInt(e.target.value) })
          }
          className="w-full h-1 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
      </div>

      {/* Price Slider */}
      <div className="mb-10">
        <label className="flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">
          <span className="flex items-center gap-2">
            <Coins size={16} className="text-amber-600" /> Max price per night
          </span>
          <span className="text-amber-700 font-bold text-sm">
            {filters.maxPrice}€
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={filters.maxPrice || 500}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
          }
          className="w-full h-1 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
      </div>

      {/* Amenity Filter Sub-component */}
      <div className="pt-2 border-t border-amber-50">
        <AmenityFilter
          allAmenities={allAmenities}
          selectedAmenities={filters.amenities || []}
          onToggle={onAmenityToggle}
          iconMap={iconMap}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
