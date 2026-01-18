import React, { useState } from "react";
import { Users, HelpCircle } from "lucide-react";
import type { Room } from "../../types/room";
import type { Amenity } from "../../types/amenity";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import BookingModal from "../modals/BookingModal";
import { showToast } from "../../utils/showToast";

interface RoomCardProps {
  room: Room;
  iconMap: Record<string, React.ElementType>;
}

const RoomSearchCard: React.FC<RoomCardProps> = ({ room, iconMap }) => {
  const rawImage =
    room.imageUrls && room.imageUrls.length > 0 ? room.imageUrls[0] : "";
  const mainImage = rawImage.trim();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleBookClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast.info("Please login to book a room.");
      setIsLoginOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100/50 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-500">
      <div className="relative h-64 w-full bg-slate-200">
        {" "}
        {mainImage ? (
          <img
            src={mainImage}
            alt={`Room ${room.roomNumber}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            No URL found
          </div>
        )}
        {/* Luxury Badge for Room Type */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-amber-800 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg shadow-sm">
            {room.roomTypeName}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Header: Room Title */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-serif text-slate-800">
            {room.roomTypeDescription}
          </h3>
        </div>
        {/* Room Description */}
        {room.description && (
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed italic mb-4">
            {room.description}
          </p>
        )}
        <div className="h-0.5 w-full round-full  bg-amber-200 opacity-80" />
        {/* Room Details & Amenities */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-5 text-sm text-slate-500 mb-6 mt-4">
          <span className="flex items-center gap-2 font-medium">
            <Users size={16} className="text-amber-600" />
            {room.roomTypeCapacity} Guests
          </span>

          {/* Render ONLY the amenities this specific room has */}
          {room.amenities && room.amenities.length > 0 ? (
            room.amenities.map((amenityName, index) => {
              const name =
                typeof amenityName === "object"
                  ? (amenityName as Amenity).name
                  : amenityName;
              const Icon = iconMap[name] || HelpCircle;

              return (
                <span key={index} className="flex items-center gap-2">
                  <Icon size={16} className="text-amber-600/70" />
                  <span className="text-slate-600">{name}</span>
                </span>
              );
            })
          ) : (
            <span className="text-xs italic text-slate-400">
              Standard features included
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-serif text-slate-900 font-bold">
              {room.pricePerNight} €
            </span>
            <span className="text-xs uppercase tracking-tighter text-slate-400 ml-1">
              / per night
            </span>
          </div>

          <button
            onClick={handleBookClick}
            className="bg-slate-900 text-amber-50 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-lg shadow-slate-200"
          >
            Book Now
          </button>

          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSwitchToRegister={openRegister}
          />
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onSwitchToLogin={openLogin}
          />
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            room={{
              id: room.id,
              name: room.roomTypeDescription,
              pricePerNight: room.pricePerNight,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomSearchCard;
