import React, { useState } from "react";
import { X } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  roomName: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  roomName,
}) => {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-300 hover:text-amber-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl font-serif italic text-slate-800 mb-2">
          Leave a Review
        </h3>
        <p className="text-slate-500 mb-8">
          How was your stay at{" "}
          <span className="text-amber-700 font-semibold">{roomName}</span>?
        </p>

        <div className="space-y-6">
          {/* Rating Selection (1-10) */}
          <div>
            <label className="text-[12px] uppercase tracking-widest text-slate-400 font-bold mb-3 block">
              Rating (1-10)
            </label>
            <div className="flex flex-wrap gap-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setRating(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${
                    rating === i + 1
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                      : "bg-slate-50 text-slate-400 hover:bg-amber-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Area */}
          <div>
            <label className="text-[12px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">
              Your Experience
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-amber-200 h-32 resize-none"
              placeholder="Tell us about your stay..."
            />
          </div>

          <button
            onClick={() => onSubmit(rating, comment)}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-s hover:bg-amber-700 transition-all shadow-xl"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};
