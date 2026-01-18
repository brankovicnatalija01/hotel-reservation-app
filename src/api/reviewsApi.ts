import { apiRequest } from "./apiClient";
import type { ReviewRequest, ReviewResponse } from "../types/review";

const PATH = "/reviews";

export const createReview = (reviewData: ReviewRequest): Promise<void> =>
  apiRequest(PATH, {
    method: "POST",
    body: JSON.stringify(reviewData),
  });

export const getAllReviews = (): Promise<ReviewResponse[]> => apiRequest(PATH);

export const getUserReviews = (userId: string): Promise<ReviewResponse[]> =>
  apiRequest(`${PATH}/user/${userId}`);

export const deleteReview = (reviewId: number): Promise<void> =>
  apiRequest(`${PATH}/${reviewId}`, {
    method: "DELETE",
  });

export const updateReview = (
  reviewId: number,
  data: { rating: number; comment: string }
): Promise<ReviewResponse> =>
  apiRequest(`${PATH}/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
