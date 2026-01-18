import React from "react";
import { Check } from "lucide-react";
import type { Amenity } from "../../types/amenity";

interface AmenityGridProps {
  all: Amenity[];
  selected: number[];
  onToggle: (id: number) => void;
}

const AmenityGrid: React.FC<AmenityGridProps> = ({
  all,
  selected,
  onToggle,
}) => {
  return (
    <div className="space-y-4 pt-4 border-t border-slate-50">
      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">
        Amenities
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {all.map((amenity) => {
          const isSelected = selected.includes(amenity.id);
          return (
            <button
              key={amenity.id}
              type="button"
              onClick={() => onToggle(amenity.id)}
              className={`flex items-center gap-3 p-4 rounded-2xl text-[11px] font-bold transition-all border ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                  : "bg-white border-slate-100 text-slate-500 hover:border-amber-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  isSelected
                    ? "bg-amber-500 border-amber-500"
                    : "border-slate-200"
                }`}
              >
                {isSelected && (
                  <Check size={10} className="text-white" strokeWidth={4} />
                )}
              </div>
              {amenity.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AmenityGrid;
