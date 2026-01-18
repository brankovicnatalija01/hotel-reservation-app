import React from "react";
import { ImagePlus, Trash2 } from "lucide-react";

interface ImageSectionProps {
  urls: string[];
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  urls,
  currentUrl,
  setCurrentUrl,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="space-y-4 pt-4 border-t border-slate-50">
      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">
        Room Gallery (URLs)
      </label>
      <div className="flex gap-2">
        <input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          placeholder="https://image-url.com"
          className="flex-1 px-5 py-4 bg-slate-50 rounded-2xl outline-none text-sm border border-transparent focus:border-amber-200 transition-all"
        />
        <button
          type="button"
          onClick={onAdd}
          className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-md shadow-slate-100"
        >
          <ImagePlus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {urls.map((url, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group animate-in slide-in-from-left-2 duration-200"
          >
            <span className="text-xs text-slate-500 truncate max-w-[85%] italic">
              {url}
            </span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
