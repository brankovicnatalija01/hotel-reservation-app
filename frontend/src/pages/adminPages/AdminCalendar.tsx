import React, { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { showToast } from "../../utils/showToast";
import { FilterBar } from "../../components/adminPanel/FilterBar";
import { StatusBadge } from "../../components/adminPanel/StatusBadge";
import { searchReservationAllFilters } from "../../api/reservationApi";
import type {
  ReservationResponse,
  SearchFilters,
} from "../../types/reservation";

const AdminCalendar: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    checkInDate: "",
    checkOutDate: "",
    status: "",
    roomNumber: "",
    fullName: "",
  });

  const fetchReservations = useCallback(
    async (criteria: SearchFilters = {}) => {
      setLoading(true);
      try {
        const cleanCriteria = Object.fromEntries(
          Object.entries(criteria).filter(
            (entry) => entry[1] !== "" && entry[1] !== undefined
          )
        );

        const data = await searchReservationAllFilters(cleanCriteria);
        setReservations(data || []);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error fetching data";
        showToast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchReservations({}); // Initial load with empty body
  }, [fetchReservations]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    const empty = {
      checkInDate: "",
      checkOutDate: "",
      status: "",
      roomNumber: "",
      fullName: "",
    };
    setFilters(empty);
    fetchReservations({});
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-2 font-bold">
              Calendar Explorer
            </h1>
            <p className="text-slate-400 italic font-serif">
              Overview of all guest bookings and stay schedules
            </p>
          </div>
          <div className="bg-white px-8 py-4 rounded-3xl border border-amber-100 shadow-sm flex flex-col items-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-[0.2em] mb-1">
              Bookings Found
            </span>
            <span className="text-3xl font-serif font-bold text-amber-700">
              {reservations.length}
            </span>
          </div>
        </header>

        <FilterBar
          filters={filters as Required<SearchFilters>}
          onChange={handleFilterChange}
          onSearch={(e) => {
            e.preventDefault();
            fetchReservations(filters);
          }}
          onReset={handleReset}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-amber-600" size={48} />
            <p className="text-slate-400 font-serif italic tracking-widest text-sm">
              Syncing records...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                      Guest Details
                    </th>
                    <th className="p-6 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                      Accommodation
                    </th>
                    <th className="p-6 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                      Stay Period
                    </th>
                    <th className="p-6 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                      Current Status
                    </th>
                    <th className="p-6 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reservations.map((res) => (
                    <tr
                      key={res.reservationId}
                      className="hover:bg-slate-50/30 transition-all duration-200"
                    >
                      <td className="p-6">
                        <p className="font-serif font-bold text-slate-800 text-lg">
                          {res.userFirstName} {res.userLastName}
                        </p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-100/50 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold border border-amber-200/50">
                            #{res.roomNumber}
                          </span>
                          <span className="text-sm text-slate-500 font-medium italic">
                            {res.roomName}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-300 font-bold uppercase">
                              In
                            </span>
                            <span className="text-sm font-semibold">
                              {res.checkInDate}
                            </span>
                          </div>
                          <div className="h-4 w-px bg-slate-200 self-end mb-1"></div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-300 font-bold uppercase">
                              Out
                            </span>
                            <span className="text-sm font-semibold">
                              {res.checkOutDate}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <StatusBadge status={res.status} />
                      </td>
                      <td className="p-6 text-right font-serif font-bold text-slate-700 text-lg">
                        ${res.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {reservations.length === 0 && (
              <div className="text-center py-32 bg-slate-50/20">
                <p className="text-slate-400 font-serif italic text-lg uppercase tracking-widest">
                  No matching reservations found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCalendar;
