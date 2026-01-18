import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { ReviewResponse } from "../../types/review";
import { getAllReviews } from "../../api/reviewsApi";

export const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data.slice(0, 9));
      } catch (err) {
        console.error("Error in ReviewSection:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="text-white text-center py-10">Loading stories...</div>
    );
  if (reviews.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review.reviewId}
          className="bg-amber-900 p-6 rounded-2xl shadow-xl border border-stone-800 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-500 group"
        >
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    i < review.rating
                      ? "fill-amber-300 text-amber-500"
                      : "text-stone-700"
                  }
                />
              ))}
              <span className="ml-2 text-amber-300/50 text-[12px] font-semibold tracking-tighter">
                {review.rating}.0
              </span>
            </div>
            <p className="text-white font-serif italic leading-relaxed mb-6 text-[16px] line-clamp-3">
              "{review.comment}"
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-full h-px bg-amber-500/10"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-px h-6 bg-amber-500/40"></div>
                <div>
                  <p className="text-stone-100 text-[10px] uppercase tracking-[0.2em] font-semibold">
                    {review.userFirstName} {review.userLastName}
                  </p>
                  <p className="text-amber-400 text-[8px] uppercase tracking-widest font-medium">
                    Verified Stay
                  </p>
                </div>
              </div>
              <span className="text-stone-300 text-[10px] font-medium uppercase">
                Room {review.roomName}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
