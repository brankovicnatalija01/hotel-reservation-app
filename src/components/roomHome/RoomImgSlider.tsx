import React, { useRef, useState } from "react";

interface Props {
  images: string[];
}

export const RoomImgSlider: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(
        scrollRef.current.scrollLeft / scrollRef.current.clientWidth
      );
      setCurrentIndex(index);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      let nextIndex;
      if (direction === "left") {
        nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      }

      scrollRef.current.scrollTo({
        left: nextIndex * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="lg:w-1/2 relative group bg-stone-100">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-hidden snap-x snap-mandatory h-80 lg:h-full scroll-smooth"
      >
        {images.map((url, index) => (
          <div key={index} className="flex-none w-full h-full snap-center">
            <img
              src={url}
              alt="Room view"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows*/}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white opacity-0 group-hover:opacity-100 transition-all z-10 drop-shadow-md hover:scale-110 active:scale-95"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white opacity-0 group-hover:opacity-100 transition-all z-10 drop-shadow-md hover:scale-110 active:scale-95"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/10 backdrop-blur-sm px-3 py-2 rounded-full">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/20 ${
              currentIndex === idx
                ? "bg-white scale-110 shadow-md"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
