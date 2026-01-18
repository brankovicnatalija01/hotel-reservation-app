export interface ReviewRequest {
  rating: number;
  comment: string;
  reservationId: number;
}

export interface ReviewResponse {
  reviewId: number;
  rating: number;
  comment: string;
  userFirstName: string;
  userLastName: string;
  roomName: string;
  roomType: string;
  roomTypeDescription: string;
}
