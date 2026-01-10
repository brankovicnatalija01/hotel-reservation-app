import React from "react";
import { Search, FilterX, User, DoorOpen } from "lucide-react";
import type { SearchFilters } from "../../types/reservation";

interface Props {
  filters: Required<SearchFilters>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<Props> = ({
  filters,
  onChange,
  onSearch,
  onReset,
}) => (
  <form
    onSubmit={onSearch}
    className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 mb-8"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* Guest */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
          Guest
        </label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 text-slate-300" size={18} />
          <input
            name="fullName"
            value={filters.fullName || ""}
            onChange={onChange}
            placeholder="Guest name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
          />
        </div>
      </div>

      {/* Room */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
          Room
        </label>
        <div className="relative">
          <DoorOpen
            className="absolute left-3 top-2.5 text-slate-300"
            size={18}
          />
          <input
            name="roomNumber"
            value={filters.roomNumber || ""}
            onChange={onChange}
            placeholder="Room #"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
          />
        </div>
      </div>

      {/* Status */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
          Status
        </label>
        <select
          name="status"
          value={filters.status || ""}
          onChange={onChange}
          className="w-full px-4 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-sm appearance-none text-slate-600 transition-all cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Check-in Date */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
          Check-in
        </label>
        <div className="relative">
          <input
            type="date"
            name="checkInDate"
            value={filters.checkInDate || ""}
            onChange={onChange}
            className="w-full px-4 py-2 bg-slate-50 rounded-xl outline-none text-sm focus:ring-2 focus:ring-amber-500/20 transition-all text-slate-600"
          />
        </div>
      </div>

      {/* Check-out Date - NOVO POLJE */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">
          Check-out
        </label>
        <div className="relative">
          <input
            type="date"
            name="checkOutDate"
            value={filters.checkOutDate || ""}
            onChange={onChange}
            className="w-full px-4 py-2 bg-slate-50 rounded-xl outline-none text-sm focus:ring-2 focus:ring-amber-500/20 transition-all text-slate-600"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="flex-1 bg-slate-800 text-white py-2 rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-slate-200"
        >
          <Search size={16} /> Search
        </button>
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all"
          title="Reset filters"
        >
          <FilterX size={18} />
        </button>
      </div>
    </div>
  </form>
);
