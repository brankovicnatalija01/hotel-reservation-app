import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ReservationHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-b border-amber-100/50 py-12 mb-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-amber-600 transition-all mb-6 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
            Back to Lodge
          </span>
        </button>
        <h1 className="text-5xl font-serif italic text-slate-900 mb-2">
          My Stays
        </h1>
        <p className="text-slate-500 text-base max-w-2xl font-light">
          Manage your retreats at Pine Mountain Lodge.
        </p>
      </div>
    </div>
  );
};
