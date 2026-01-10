export interface ReservationRequest {
  checkInDate: string;
  checkOutDate: string;
  roomId: number;
  userId: number;
}

export interface ReservationResponse {
  reservationId: number;
  checkInDate: string;
  checkOutDate: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED"
    | "EXPIRED";
  totalPrice: number;

  roomId: number;
  roomNumber: string;
  roomName: string;
  roomDescription: string;

  userId: number;
  userFirstName: string;
  userLastName: string;
}

export const STATUS_PRIORITY: Record<string, number> = {
  CONFIRMED: 1,
  PENDING: 2,
  COMPLETED: 3,
  CANCELLED: 4,
  EXPIRED: 5,
};
