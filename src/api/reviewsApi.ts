import type { ReviewRequest, ReviewResponse } from "../types/review";

const BASE_URL = "http://localhost:8080/api/reviews";

export const createReview = async (
  reviewData: ReviewRequest
): Promise<void> => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit review");
  }
};

export const getAllReviews = async (): Promise<ReviewResponse[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};
