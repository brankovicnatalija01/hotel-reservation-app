import toast from "react-hot-toast";
import React from "react";
import { Info } from "lucide-react";

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: "1.5rem",
        background: "#0f172a", // slate-900
        color: "#fff",
        padding: "16px 24px",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "0.025em",
        border: "1px solid #475569",
      },
      iconTheme: {
        primary: "#f59e0b", // amber-500
        secondary: "#0f172a",
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        borderRadius: "1.5rem",
        background: "#fff1f2", // red-50
        color: "#991b1b", // red-800
        padding: "16px 24px",
        fontSize: "14px",
        fontWeight: "600",
        border: "1px solid #fecaca",
      },
    });
  },
  info: (message: string) => {
    toast(message, {
      icon: React.createElement(Info, {
        size: 22,
        className: "text-amber-600",
      }),
      style: {
        borderRadius: "1.5rem",
        background: "#ffffff",
        color: "#92400e",
        padding: "16px 24px",
        fontSize: "17px",
        fontWeight: "600",
        border: "1px solid #fde68a",
        boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.15)",
      },
    });
  },
};
