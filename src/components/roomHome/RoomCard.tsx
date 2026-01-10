import React from "react";
import type { Room } from "../../types/room";
import { RoomImgSlider } from "./RoomImgSlider";
import { useNavigate } from "react-router-dom";

interface Props {
  room: Room;
}

export const RoomCard: React.FC<Props> = ({ room }) => {
  const navigate = useNavigate();
  const handleCheckAvailability = () => {
    navigate("/search");
  };

  return (
    <article className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-137.5 hover:scale-[1.01] transition-transform duration-300">
      <RoomImgSlider images={room.imageUrls} />
      <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
        <header className="mb-6">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-4xl font-serif text-stone-900">
              {room.roomTypeName}
            </h2>
            <span className="self-end text-amber-600  font-extrabold tracking-widest text-[16px] uppercase bg-amber-50 px-4 py-1.5 rounded-lg border border-amber-100">
              Up to {room.roomTypeCapacity} Guests
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium text-stone-700 text-justify leading-snug">
              {room.roomTypeDescription}
            </p>
            <p className="text-stone-400 text-s italic font-light text-justify leading-relaxed">
              {room.description}
            </p>
          </div>
        </header>

        <div className="flex items-baseline gap-2 mb-8 border-b border-stone-100 pb-6">
          <span className="text-4xl font-light text-stone-900">
            {room.pricePerNight}€
          </span>
          <span className="text-[12px] text-stone-400 uppercase tracking-widest font-bold">
            Per Night
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-10">
          {room.amenities.map((a, i) => (
            <div
              key={i}
              className="flex items-center text-stone-600 text-[15px] font-semibold uppercase tracking-wider"
            >
              <div className="shrink-0">
                <svg
                  className="w-5 h-5 mr-3 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="truncate">{a}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckAvailability}
          className="w-full bg-stone-900 hover:bg-amber-800 text-white font-extrabold py-5 rounded-2xl transition-all uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-95"
        >
          Check Availability
        </button>
      </div>
    </article>
  );
};
