import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Bed, Home } from "lucide-react";
import { fetchRooms, deleteRoom } from "../../api/roomApi";
import { RoomModal } from "../../components/modals/RoomModal";
import { showToast } from "../../utils/showToast";
import type { RoomResponse } from "../../types/room";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const ManageRooms: React.FC = () => {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await fetchRooms();
      setRooms(data || []);
    } catch (error) {
      showToast.error("Failed to load rooms inventory");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleOpenModal = (room: RoomResponse | null = null) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };
  const openDeleteModal = (id: number) => {
    setSelectedRoomId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRoomId) {
      try {
        await deleteRoom(selectedRoomId);
        showToast.success("Room removed from inventory");
        loadRooms();
      } catch {
        showToast.error("Cannot delete room with active bookings");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold uppercase tracking-widest text-[12px]">
              <Home size={14} />
              <span>Property Administration</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-slate-900">
              Manage Rooms
            </h1>
            <p className="text-slate-400 mt-2 italic font-medium">
              Overseeing inventory for{" "}
              <span className="text-slate-600">
                Pine Mountain Lodge (ID: #1)
              </span>
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Plus size={20} />
            <span>Add New Room</span>
          </button>
        </header>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <Loader2 className="animate-spin text-amber-600" size={40} />
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
              Refreshing Inventory
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-8 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                      Room Details
                    </th>
                    <th className="p-8 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                      Type & Capacity
                    </th>
                    <th className="p-8 text-[11px] uppercase tracking-widest text-slate-400 font-bold text-right">
                      Pricing
                    </th>
                    <th className="p-8 text-[11px] uppercase tracking-widest text-slate-400 font-bold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <tr
                        key={room.id}
                        className="hover:bg-slate-50/30 transition-all group"
                      >
                        <td className="p-8">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-amber-50 rounded-[1.25rem] flex items-center justify-center text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                              <Bed size={28} />
                            </div>
                            <div>
                              <p className="text-xl font-serif font-bold text-slate-800 mb-1">
                                Room {room.roomNumber}
                              </p>
                              <div className="flex gap-2">
                                {room.amenities.slice(0, 2).map((a, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase"
                                  >
                                    {a}
                                  </span>
                                ))}
                                {room.amenities.length > 2 && (
                                  <span className="text-[10px] text-slate-300 font-bold">
                                    +{room.amenities.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-8">
                          <div>
                            <p className="font-bold text-slate-700">
                              {room.roomTypeName}
                            </p>
                            <p className="text-xs text-slate-400">
                              Up to {room.roomTypeCapacity} guests
                            </p>
                          </div>
                        </td>
                        <td className="p-8 text-right font-serif">
                          <div className="flex items-center justify-end gap-1 text-2xl font-bold text-slate-800">
                            <span className="text-amber-500 text-lg">€</span>
                            {room.pricePerNight.toFixed(2)}
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                            <button
                              onClick={() => handleOpenModal(room)}
                              className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                              title="Edit Room"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(room.id)}
                              className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-20 text-center">
                        <p className="text-slate-400 italic">
                          No rooms found in the inventory.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <RoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onRefresh={loadRooms}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Room Unit"
        message={`Are you sure you want to permanently remove this room from your property inventory? This action cannot be undone.`}
      />
    </div>
  );
};

export default ManageRooms;
