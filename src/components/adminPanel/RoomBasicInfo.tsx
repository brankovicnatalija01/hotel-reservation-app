import React from "react";

interface RoomBasicInfoProps {
  roomNumber: string;
  pricePerNight: number;
  description: string;
  onChange: (field: string, value: string | number) => void;
}

const RoomBasicInfo: React.FC<RoomBasicInfoProps> = ({
  roomNumber,
  pricePerNight,
  description,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">
            Room Number
          </label>
          <input
            required
            value={roomNumber}
            onChange={(e) => onChange("roomNumber", e.target.value)}
            className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-amber-200 transition-all text-sm font-medium"
            placeholder="e.g. 101"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">
            Price per Night ($)
          </label>
          <input
            type="number"
            required
            value={pricePerNight}
            onChange={(e) => onChange("pricePerNight", Number(e.target.value))}
            className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-amber-200 transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-amber-200 transition-all resize-none text-sm font-medium"
          placeholder="Describe the room ambiance..."
        />
      </div>
    </div>
  );
};

export default RoomBasicInfo;
