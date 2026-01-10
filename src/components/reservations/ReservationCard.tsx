import { Calendar, CheckCircle2, Clock, History, XCircle } from "lucide-react";
import type { ReservationResponse } from "../../types/reservation";

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

  const isInactive = isCompleted || isCancelled || isExpired;

  return (
    <div
      className={`bg-white rounded-4xl shadow-sm border border-amber-100/30 overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${
        isInactive ? "opacity-60" : "hover:border-amber-200"
      }`}
    >
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {isCompleted && <History size={16} className="text-slate-400" />}
              {isCancelled && <XCircle size={16} className="text-red-500" />}
              {isExpired && <XCircle size={16} className="text-slate-400" />}
              {res.status === "CONFIRMED" && (
                <CheckCircle2 size={16} className="text-emerald-500" />
              )}
              {res.status === "PENDING" && (
                <Clock size={16} className="text-amber-500" />
              )}

              <span
                className={`text-[14px] font-bold uppercase tracking-[0.15em] ${
                  isCompleted || isExpired
                    ? "text-slate-400"
                    : isCancelled
                    ? "text-red-600"
                    : res.status === "CONFIRMED"
                    ? "text-emerald-600"
                    : "text-amber-600"
                }`}
              >
                {res.status}
              </span>
            </div>

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

          {isCompleted && (
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => onLeaveReview(res)}
                className="bg-amber-600/10 text-amber-800 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-amber-600 hover:text-white transition-all"
              >
                Leave a Review
              </button>
              <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold italic">
                Thank you for staying with us
              </span>
            </div>
          )}

          {isExpired && (
            <span className="text-[12px] text-red-400 uppercase tracking-widest font-bold">
              Reservation Expired
            </span>
          )}

          {isCancelled && (
            <span className="text-[14px] text-red-500 uppercase tracking-widest font-bold">
              Cancelled
            </span>
          )}

          {res.status === "PENDING" || res.status === "CONFIRMED" ? (
            <button
              onClick={() => onCancel(res.reservationId)}
              className="group text-right"
            >
              <p className="text-[13px] text-red-500 uppercase tracking-widest font-bold border-b border-transparent group-hover:border-red-500 transition-all cursor-pointer">
                Cancel Reservation
              </p>
            </button>
          ) : null}
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
