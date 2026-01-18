import React, { useEffect, useState, useCallback } from "react";
import {
  searchReservations,
  approveReservation,
  rejectReservation,
} from "../../api/reservationApi";
import {
  Check,
  X,
  Clock,
  Calendar,
  User,
  BedDouble,
  Wallet,
  ArrowRight,
} from "lucide-react";
import type { ReservationResponse } from "../../types/reservation";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

const ApproveBookings: React.FC = () => {
  const [bookings, setBookings] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // State za ConfirmModal (odbijanje)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);
      const data = await searchReservations({ status: "PENDING" });
      setBookings(data);
    } catch (err) {
      console.error("Error fetching pending bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleApprove = async (id: number) => {
    try {
      await approveReservation(id);
      setBookings((prev) => prev.filter((b) => b.reservationId !== id));
    } catch {
      alert("Failed to approve booking.");
    }
  };

  const handleReject = async () => {
    if (selectedId) {
      try {
        await rejectReservation(selectedId);
        setBookings((prev) =>
          prev.filter((b) => b.reservationId !== selectedId)
        );
        setSelectedId(null);
      } catch {
        alert("Failed to reject booking.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
        <p className="font-serif italic text-stone-500 text-lg">
          Loading guest requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16  rounded-3xl flex items-center justify-center text-amber-600">
              <Clock size={50} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">
                Pending <span className="text-amber-600 italic">Approvals</span>
              </h1>
              <p className="text-stone-500 font-medium uppercase tracking-[0.15em] text-[12px] mt-3">
                Lodge Management System • {bookings.length} Requests
              </p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-stone-100 rounded-[3rem] p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
              <Check size={40} />
            </div>
            <h2 className="text-2xl font-serif text-slate-800 mb-2">
              All Caught Up!
            </h2>
            <p className="text-stone-400 italic">
              There are no pending reservations to review at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.reservationId}
                className="bg-white border border-stone-100 rounded-[2.5rem] p-8 flex flex-col xl:flex-row items-center justify-between gap-10 hover:shadow-2xl hover:shadow-stone-200/40 transition-all duration-500 group"
              >
                {/* Guest Info */}
                <div className="flex items-center gap-6 min-w-60">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-amber-500 shadow-lg shadow-slate-200">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-amber-600 mb-1">
                      Guest Details
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {booking.userFirstName} {booking.userLastName}
                    </h3>
                    <p className="text-stone-400 text-sm italic">
                      ID: #{booking.reservationId}
                    </p>
                  </div>
                </div>

                {/* Stay Info */}
                <div className="flex flex-wrap justify-center gap-12 flex-1">
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 text-stone-400">
                      <BedDouble size={16} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        Accommodation
                      </span>
                    </div>
                    <p className="text-slate-800 font-bold">
                      {booking.roomNumber}
                    </p>
                    <p className="text-stone-500 text-sm font-serif italic">
                      {booking.roomName}
                    </p>
                  </div>

                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 text-stone-400">
                      <Calendar size={16} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        Dates
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800">
                        {booking.checkInDate}
                      </span>
                      <ArrowRight size={14} className="text-amber-500" />
                      <span className="font-bold text-slate-800">
                        {booking.checkOutDate}
                      </span>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 text-stone-400">
                      <Wallet size={16} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        Revenue
                      </span>
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      ${booking.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 border-t xl:border-t-0 xl:border-l border-stone-100 pt-6 xl:pt-0 xl:pl-10 w-full xl:w-auto justify-center">
                  <button
                    onClick={() => {
                      setSelectedId(booking.reservationId);
                      setIsRejectModalOpen(true);
                    }}
                    className="p-5 bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 rounded-3xl transition-all duration-300"
                    title="Reject Request"
                  >
                    <X size={24} />
                  </button>
                  <button
                    onClick={() => handleApprove(booking.reservationId)}
                    className="flex-1 xl:flex-none px-10 py-5 bg-slate-900 text-white hover:bg-amber-600 rounded-3xl transition-all duration-300 shadow-xl shadow-slate-200 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3"
                  >
                    <Check size={18} />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Confirmation Modal */}
      <ConfirmModal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleReject}
        title="Reject Reservation?"
        message="This will notify the guest that their stay at Pine Mountain Lodge has been declined. This action is permanent."
      />
    </div>
  );
};

export default ApproveBookings;
