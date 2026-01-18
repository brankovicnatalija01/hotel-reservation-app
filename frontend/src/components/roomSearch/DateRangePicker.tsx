import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  checkIn: string | undefined;
  checkOut: string | undefined;
  onCheckInChange: (date: string | undefined) => void;
  onCheckOutChange: (date: string | undefined) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}) => {
  const parseDate = (dateStr: string | undefined) =>
    dateStr ? new Date(dateStr) : null;

  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : undefined;

  const inputStyles = `
    w-full bg-white px-4 py-3 
    border border-amber-200/60 rounded-xl 
    text-slate-700 text-sm 
    focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 
    outline-none transition-all duration-300
    placeholder:text-slate-400
  `;

  return (
    <div className="space-y-5 mb-10 w-full">
      {/* Check-in Input */}
      <div className="w-full">
        <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2 ml-1">
          <Calendar size={16} className="text-amber-600" /> Check-in Date
        </label>
        <div className="relative w-full">
          <DatePicker
            selected={parseDate(checkIn)}
            onChange={(date: Date | null) => onCheckInChange(formatDate(date))}
            className={inputStyles}
            wrapperClassName="w-full"
            placeholderText="Select arrival date"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
        </div>
      </div>

      {/* Check-out Input */}
      <div className="w-full">
        <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2 ml-1">
          <Calendar size={16} className="text-amber-600" /> Check-out Date
        </label>
        <div className="relative w-full">
          <DatePicker
            selected={parseDate(checkOut)}
            onChange={(date: Date | null) => onCheckOutChange(formatDate(date))}
            className={inputStyles}
            wrapperClassName="w-full"
            placeholderText="Select departure date"
            minDate={parseDate(checkIn) || new Date()}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
