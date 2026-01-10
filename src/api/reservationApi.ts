import type {
  ReservationRequest,
  ReservationResponse,
} from "../types/reservation";

export const createReservation = async (data: ReservationRequest) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/api/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create reservation");
  }

  return response.json();
};

export const getUserReservations = async (
  userId: number
): Promise<ReservationResponse[]> => {
  const token = localStorage.getItem("token");
  console.log("User ID:", userId);

  if (!token) throw new Error("No token found. Please login again.");

  const response = await fetch(
    `http://localhost:8080/api/reservations/user/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch reservations");
  }

  return response.json();
};

export const cancelReservation = async (
  reservationId: number
): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://localhost:8080/api/reservations/cancel/${reservationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to cancel reservation");
  }
};
