import React from "react";
import { HelpCircle, Sparkle } from "lucide-react";
import type { Amenity } from "../../types/amenity";

interface AmenityFilterProps {
  allAmenities: Amenity[];
  selectedAmenities: string[];
  onToggle: (amenity: string) => void;
  iconMap: Record<string, React.ElementType>;
}

const AmenityFilter: React.FC<AmenityFilterProps> = ({
  allAmenities,
  selectedAmenities,
  onToggle,
  iconMap,
}) => {
  return (
    <div>
      {/* Section Header with refined typography */}
      <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-slate-500 mb-5 ml-1">
        <Sparkle size={16} className="text-amber-600" />
        Premium Amenities
      </h4>

      <div className="space-y-1">
        {allAmenities.map((amenity) => {
          const Icon = iconMap[amenity.name] || HelpCircle;
          const isSelected = selectedAmenities.includes(amenity.name);

          return (
            <label
              key={amenity.id}
              className={`
                flex items-center gap-3 cursor-pointer group 
                p-2.5 rounded-xl transition-all duration-300
                ${isSelected ? "bg-amber-50/50" : "hover:bg-slate-50"}
              `}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(amenity.name)}
                  className="
                    w-5 h-5 rounded-md border-amber-200 
                    text-amber-600 focus:ring-amber-500/20 
                    cursor-pointer transition-all
                  "
                />
              </div>
              <Icon
                size={18}
                className={`
                  transition-colors duration-300
                  ${
                    isSelected
                      ? "text-amber-600"
                      : "text-slate-500 group-hover:text-amber-600"
                  }
                `}
              />

              {/* Amenity Label */}
              <span
                className={`
                text-sm transition-colors duration-300
                ${
                  isSelected
                    ? "text-amber-600 font-medium"
                    : "text-slate-500 group-hover:text-amber-700"
                }
              `}
              >
                {amenity.name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AmenityFilter;
