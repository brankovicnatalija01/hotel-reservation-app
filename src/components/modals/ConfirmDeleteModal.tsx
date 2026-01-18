import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteReviewModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Review",
  message = "Are you sure you want to delete this story? This action cannot be undone.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 animate-in fade-in zoom-in duration-300 text-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-300 hover:text-amber-600 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-2xl font-serif italic text-slate-800 mb-3">
          {title}
        </h3>
        <p className="text-slate-500 mb-8 leading-relaxed font-sans">
          {message}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-lg shadow-red-100"
          >
            Confirm Delete
          </button>
          <button
            onClick={onClose}
            className="w-full bg-slate-50 text-slate-500 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-100 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
