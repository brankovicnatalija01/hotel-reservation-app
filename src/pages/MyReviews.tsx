import React, { useEffect, useState, useCallback } from "react";
import { getUserReviews, deleteReview, updateReview } from "../api/reviewsApi";
import type { ReviewResponse } from "../types/review";
import { Star, MessageSquare, Trash2, Edit3, X, Check } from "lucide-react";
import DeleteReviewModal from "../components/modals/ConfirmDeleteModal";

const MyReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);

  const userId = localStorage.getItem("userId");

  const fetchReviews = useCallback(() => {
    if (userId) {
      getUserReviews(userId)
        .then(setReviews)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleConfirmDelete = async () => {
    if (reviewIdToDelete) {
      try {
        await deleteReview(reviewIdToDelete);
        setReviews((prev) =>
          prev.filter((r) => r.reviewId !== reviewIdToDelete)
        );
        setReviewIdToDelete(null);
      } catch {
        alert("Error deleting review");
      }
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateReview(id, editForm);
      setEditingId(null);
      fetchReviews();
    } catch {
      alert("Error updating review");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-amber-100 rounded-2xl text-amber-700">
            <MessageSquare size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900">
              My Reviews
            </h1>
            <p className="text-stone-500 text-sm">
              Manage your shared experiences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div
              key={review.reviewId}
              className="bg-stone-200/50 backdrop-blur-sm p-6 rounded-4xl border border-stone-300/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all duration-300"
            >
              <div className="flex-1 w-full">
                {/* Rating and Room Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <button
                        key={i}
                        disabled={editingId !== review.reviewId}
                        onClick={() =>
                          setEditForm({ ...editForm, rating: i + 1 })
                        }
                      >
                        <Star
                          size={12}
                          className={
                            i <
                            (editingId === review.reviewId
                              ? editForm.rating
                              : review.rating)
                              ? "fill-amber-600 text-amber-600"
                              : "text-stone-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">
                    {review.roomType}:{" "}
                    <span className="font-medium normal-case italic">
                      {review.roomTypeDescription}
                    </span>
                  </span>
                </div>
                {editingId === review.reviewId ? (
                  <textarea
                    className="w-full bg-white border border-amber-200 rounded-xl p-3 text-stone-800 font-serif italic focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    value={editForm.comment}
                    onChange={(e) =>
                      setEditForm({ ...editForm, comment: e.target.value })
                    }
                    rows={3}
                  />
                ) : (
                  <p className="text-stone-800 font-serif italic text-lg leading-relaxed">
                    "{review.comment}"
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 md:border-l md:border-stone-300 md:pl-6 h-full shrink-0">
                {editingId === review.reviewId ? (
                  <>
                    <button
                      onClick={() => handleUpdate(review.reviewId)}
                      className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-sm transition-all"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2.5 bg-stone-400 text-white rounded-full hover:bg-stone-500 shadow-sm transition-all"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(review.reviewId);
                        setEditForm({
                          rating: review.rating,
                          comment: review.comment,
                        });
                      }}
                      className="p-3 bg-white rounded-full text-stone-400 hover:text-amber-600 hover:shadow-md transition-all"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setReviewIdToDelete(review.reviewId);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-3 bg-white rounded-full text-stone-400 hover:text-red-500 hover:shadow-md transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteReviewModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setReviewIdToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MyReviews;
