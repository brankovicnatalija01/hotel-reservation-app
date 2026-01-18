import React, { useState, useMemo, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { showToast } from "../../utils/showToast";
import { createReservation } from "../../api/reservationApi";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: { id: number; name: string; pricePerNight: number };
}
const calculateTotalPrice = (
  checkIn: string,
  checkOut: string,
  price: number
) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays * price : 0;
};
const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  room,
}) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

  // reset modal when closed
  useEffect(() => {
    if (!isOpen) {
      setCheckIn("");
      setCheckOut("");
      setLoading(false);
    }
  }, [isOpen]);

  // count total amount when dates change
  const totalAmount = useMemo(
    () => calculateTotalPrice(checkIn, checkOut, room.pricePerNight),
    [checkIn, checkOut, room.pricePerNight]
  );

  if (!isOpen) return null;

  const handleConfirm = async () => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) {
      showToast.error("User ID not found. Please log in again.");
      return;
    }

    if (!checkIn || !checkOut) {
      showToast.error("Please select both dates");
      return;
    }

    setLoading(true);
    try {
      await createReservation({
        checkInDate: checkIn,
        checkOutDate: checkOut,
        roomId: room.id,
        userId: Number(storedId),
      });

      showToast.success("Reservation successful!");
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-14 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-10 right-10 text-slate-400 hover:text-amber-600 transition-colors"
        >
          <X size={28} />
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-serif italic text-slate-800 mb-2">
            Book Your Stay
          </h2>
          <p className="text-slate-500 text-lg">{room.name}</p>
        </div>

        <div className="space-y-8">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-slate-50 border border-amber-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-50 border border-amber-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Pricing Details */}
          <div className="bg-slate-50 rounded-3xl p-8 space-y-4 border border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span>Price per night</span>
              <span className="font-bold">${room.pricePerNight}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Nights</span>
              <span className="font-bold">
                {totalAmount / room.pricePerNight || 0}
              </span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex justify-between items-center text-slate-900 pt-2">
              <span className="text-lg font-bold">Total Price</span>
              <span className="text-3xl font-serif italic text-amber-600">
                ${totalAmount}
              </span>
            </div>
          </div>

          <button
            disabled={loading || totalAmount <= 0}
            onClick={handleConfirm}
            className="w-full bg-slate-900 text-amber-50 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-amber-600 transition-all disabled:opacity-50 shadow-xl"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Confirm Reservation"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
