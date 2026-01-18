import React, { useEffect, useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { createRoom, updateRoom } from "../../api/roomApi";
import { getAmenities } from "../../api/amenityApi";
import { getAllRoomTypes } from "../../api/roomTypeApi";
import { showToast } from "../../utils/showToast";
import type { RoomResponse } from "../../types/room";
import type { Amenity } from "../../types/amenity";
import type { RoomType } from "../../types/roomType";
import RoomBasicInfo from "../adminPanel/RoomBasicInfo";
import ImageSection from "../adminPanel/ImageSection";
import AmenityGrid from "../adminPanel/AmenityGrid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  room: RoomResponse | null;
  onRefresh: () => void;
}

export const RoomModal: React.FC<Props> = ({
  isOpen,
  onClose,
  room,
  onRefresh,
}) => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [allAmenities, setAllAmenities] = useState<Amenity[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    roomNumber: "",
    pricePerNight: 0,
    description: "",
    propertyId: 1,
    roomTypeId: 0,
    amenityIds: [] as number[],
    imageUrls: [] as string[],
  });

  useEffect(() => {
    const initModal = async () => {
      if (!isOpen) return;
      setLoading(true);
      try {
        const [types, amenitiesData] = await Promise.all([
          getAllRoomTypes(),
          getAmenities(),
        ]);
        setRoomTypes(types);
        setAllAmenities(amenitiesData);

        if (room) {
          const mappedAmenityIds = room.amenities
            .map((name) => amenitiesData.find((a) => a.name === name)?.id)
            .filter((id): id is number => id !== undefined);

          setFormData({
            roomNumber: room.roomNumber,
            pricePerNight: room.pricePerNight,
            description: room.description,
            propertyId: 1,
            roomTypeId: room.roomTypeId,
            amenityIds: mappedAmenityIds,
            imageUrls: room.imageUrls || [],
          });
        } else {
          setFormData({
            roomNumber: "",
            pricePerNight: 0,
            description: "",
            propertyId: 1,
            roomTypeId: 0,
            amenityIds: [],
            imageUrls: [],
          });
        }
      } catch {
        showToast.error("Failed to load modal resources");
      } finally {
        setLoading(false);
      }
    };
    initModal();
  }, [isOpen, room]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.roomTypeId === 0)
      return showToast.error("Please select a room type");

    setLoading(true);
    try {
      if (room) {
        await updateRoom(room.id, {
          ...formData,
          propertyId: 1,
        });
      } else {
        await createRoom(formData);
      }

      showToast.success(room ? "Room updated" : "Room created");
      onRefresh();
      onClose();
    } catch {
      showToast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const updateFormField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">
              {room ? `Edit Room #${room.roomNumber}` : "Add New Unit"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar"
        >
          {loading ? (
            <div className="py-24 flex flex-col items-center gap-4 text-center">
              <Loader2 className="animate-spin text-amber-600" size={32} />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Synchronizing Data...
              </p>
            </div>
          ) : (
            <>
              {/* 1. Room Type Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-widest">
                  Select Room Architecture
                </label>
                <select
                  required
                  value={formData.roomTypeId}
                  onChange={(e) =>
                    updateFormField("roomTypeId", Number(e.target.value))
                  }
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/20 font-medium text-slate-700 cursor-pointer transition-all"
                >
                  <option value={0}>Choose a type...</option>
                  {roomTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Basic Info & Images (Only for Create) */}
              {!room && (
                <>
                  <RoomBasicInfo
                    roomNumber={formData.roomNumber}
                    pricePerNight={formData.pricePerNight}
                    description={formData.description}
                    onChange={updateFormField}
                  />

                  <ImageSection
                    urls={formData.imageUrls}
                    currentUrl={newImageUrl}
                    setCurrentUrl={setNewImageUrl}
                    onAdd={() => {
                      if (newImageUrl.trim()) {
                        setFormData((prev) => ({
                          ...prev,
                          imageUrls: [...prev.imageUrls, newImageUrl.trim()],
                        }));
                        setNewImageUrl("");
                      }
                    }}
                    onRemove={(idx) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageUrls: prev.imageUrls.filter((_, i) => i !== idx),
                      }))
                    }
                  />
                </>
              )}

              {/* 3. Amenities Grid */}
              <AmenityGrid
                all={allAmenities}
                selected={formData.amenityIds}
                onToggle={(id) =>
                  setFormData((prev) => ({
                    ...prev,
                    amenityIds: prev.amenityIds.includes(id)
                      ? prev.amenityIds.filter((aId) => aId !== id)
                      : [...prev.amenityIds, id],
                  }))
                }
              />

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-3xlfont-bold shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98] mt-4"
              >
                <Save size={18} />
                {room ? "Update Room Configuration" : "Confirm & Register Unit"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
