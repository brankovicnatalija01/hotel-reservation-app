import type { ReservationRequest } from "../types/ReservationRequest";
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
