import { CheckCircle2, Clock, XCircle, History, Ban } from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "minimal"; // Dodajemo opciju za stil
}

export const StatusBadge = ({
  status,
  variant = "default",
}: StatusBadgeProps) => {
  const styles: Record<
    string,
    { color: string; bg: string; icon: LucideIcon }
  > = {
    CONFIRMED: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: CheckCircle2,
    },
    PENDING: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
    COMPLETED: { color: "text-slate-500", bg: "bg-slate-100", icon: History },
    CANCELLED: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
    REJECTED: { color: "text-red-700", bg: "bg-red-100", icon: Ban },
    EXPIRED: { color: "text-slate-400", bg: "bg-slate-50", icon: XCircle },
  };

  const config = styles[status] || styles.PENDING;
  const Icon = config.icon;

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${config.color}`}>
        <Icon size={16} />
        <span className="text-[14px] font-bold uppercase tracking-[0.15em]">
          {status}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.color} ${config.bg}`}
    >
      <Icon size={14} />
      {status}
    </span>
  );
};
