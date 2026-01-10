import React from "react";
import { Calendar } from "lucide-react";
import type { ReservationResponse } from "../../types/reservation";
import { StatusBadge } from "../adminPanel/StatusBadge";

interface Props {
  res: ReservationResponse;
  onCancel: (id: number) => void;
  onLeaveReview: (res: ReservationResponse) => void;
}

export const ReservationCard: React.FC<Props> = ({
  res,
  onCancel,
  onLeaveReview,
}) => {
  const isCompleted = res.status === "COMPLETED";
  const isCancelled = res.status === "CANCELLED";
  const isExpired = res.status === "EXPIRED";
  const isRejected = res.status === "REJECTED";

  const isInactive = isCompleted || isCancelled || isExpired || isRejected;

  return (
    <div
      className={`bg-white rounded-4xl shadow-sm border border-amber-100/30 overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${
        isCompleted
          ? "opacity-80"
          : isCancelled || isExpired || isRejected
          ? "opacity-60"
          : "hover:border-amber-200"
      }`}
    >
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-3">
            <StatusBadge status={res.status} variant="minimal" />

            <h3 className="text-2xl font-serif text-slate-800 mb-1">
              {res.roomName}{" "}
              <span className="text-slate-300 font-light text-lg ml-1">
                #{res.roomNumber}
              </span>
            </h3>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5 font-bold">
              Total Amount
            </p>
            <p
              className={`text-3xl font-serif font-bold ${
                isInactive && !isCompleted
                  ? "text-slate-300 line-through"
                  : "text-amber-700"
              }`}
            >
              ${res.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-slate-50">
          <DateInfo label="Check-in" date={res.checkInDate} />
          <DateInfo label="Check-out" date={res.checkOutDate} />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
              Guest
            </p>
            <p className="text-s text-slate-700 font-semibold font-serif tracking-wide italic">
              {res.userFirstName} {res.userLastName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isCompleted && (
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => onLeaveReview(res)}
                  className="bg-amber-600/10 text-amber-800 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-amber-600 hover:text-white transition-all"
                >
                  Leave a Review
                </button>
              </div>
            )}

            {(res.status === "PENDING" || res.status === "CONFIRMED") && (
              <button
                onClick={() => onCancel(res.reservationId)}
                className="group text-right"
              >
                <p className="text-[13px] text-red-500 uppercase tracking-widest font-bold border-b border-transparent group-hover:border-red-500 transition-all cursor-pointer">
                  Cancel Reservation
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-slate-400">
      <Calendar size={15} />
      <span className="text-[11px] uppercase font-bold tracking-widest">
        {label}
      </span>
    </div>
    <p className="text-xl font-semibold text-slate-700 ml-6 font-serif">
      {date}
    </p>
  </div>
);
