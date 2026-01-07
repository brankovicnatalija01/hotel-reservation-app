import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Room } from "../../types/Room";
import { fetchRooms } from "../../api/roomApi";
import { RoomCard } from "../roomHome/RoomCard";

const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

export const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRooms().then((data) => {
      setRooms(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="text-center py-20 font-serif uppercase tracking-[0.3em] text-stone-400 animate-pulse">
          Loading Rooms...
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-24 max-w-6xl mx-auto py-20 px-6">
      {rooms.map((room) => (
        <motion.div
          key={room.id}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <RoomCard room={room} />
        </motion.div>
      ))}
    </div>
  );
};
