import React, { useEffect, useState, useCallback } from "react";
import { getUserReservations, cancelReservation } from "../api/reservationApi";
import { createReview } from "../api/reviewsApi";
import type { ReservationResponse } from "../types/reservation";
import { STATUS_PRIORITY } from "../types/reservation";
import { Loader2 } from "lucide-react";
import { showToast } from "../utils/showToast";
import { ReservationHeader } from "../components/reservations/ReservationHeader";
import { ReservationCard } from "../components/reservations/ReservationCard";
import { ConfirmModal } from "../components/modals/ConfirmModal";
import { ReviewModal } from "../components/modals/ReviewModal";

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedResId, setSelectedResId] = useState<number | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedResForReview, setSelectedResForReview] =
    useState<ReservationResponse | null>(null);

  const fetchReservations = useCallback(async () => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) return;

    try {
      const data = await getUserReservations(Number(storedId));
      setReservations(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const triggerCancel = (id: number) => {
    setSelectedResId(id);
    setIsConfirmOpen(true);
  };

  const confirmCancel = async () => {
    if (selectedResId === null) return;

    try {
      setLoading(true);
      await cancelReservation(selectedResId);
      showToast.success("Your retreat has been cancelled.");
      await fetchReservations();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error cancelling reservation";
      showToast.error(msg);
    } finally {
      setLoading(false);
      setIsConfirmOpen(false);
      setSelectedResId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={48} />
      </div>
    );
  }

  const handleReviewClick = (res: ReservationResponse) => {
    setSelectedResForReview(res);
    setIsReviewOpen(true);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!selectedResForReview) return;

    try {
      setLoading(true);
      await createReview({
        rating,
        comment,
        reservationId: selectedResForReview.reservationId,
      });

      showToast.success("Review submitted successfully!");
      setIsReviewOpen(false);
    } catch (err: unknown) {
      showToast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pb-20 font-sans">
      <ReservationHeader />

      <div className="max-w-6xl mx-auto px-6">
        {reservations.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-amber-200">
            <h3 className="text-2xl font-serif italic text-slate-800 mb-2">
              No bookings yet
            </h3>
            <p className="text-slate-400 font-light italic">
              Your future adventures will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {reservations
              .slice()
              .sort(
                (a, b) => STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status]
              )
              .map((res) => (
                <ReservationCard
                  key={res.reservationId}
                  res={res}
                  onCancel={() => triggerCancel(res.reservationId)}
                  onLeaveReview={handleReviewClick}
                />
              ))}

            <ReviewModal
              isOpen={isReviewOpen}
              onClose={() => setIsReviewOpen(false)}
              roomName={selectedResForReview?.roomName || ""}
              onSubmit={handleReviewSubmit}
            />
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setSelectedResId(null);
        }}
        onConfirm={confirmCancel}
        title="Change of Plans?"
        message="Are you sure you want to cancel your stay? This action cannot be undone and your room will be released for other guests."
      />
    </div>
  );
};

export default MyReservations;
