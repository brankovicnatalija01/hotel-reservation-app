import { apiRequest } from "./apiClient";
import type {
  ReservationRequest,
  ReservationResponse,
  SearchFilters,
} from "../types/reservation";

const PATH = "/reservations";

export const createReservation = (data: ReservationRequest) =>
  apiRequest<ReservationResponse>(PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getUserReservations = (userId: number) =>
  apiRequest<ReservationResponse[]>(`${PATH}/user/${userId}`);

export const cancelReservation = (id: number) =>
  apiRequest<void>(`${PATH}/cancel/${id}`, { method: "PUT" });

export const searchReservations = (criteria: { status: string }) =>
  apiRequest<ReservationResponse[]>(`${PATH}/search`, {
    method: "POST",
    body: JSON.stringify(criteria),
  });

export const searchReservationAllFilters = (criteria: Partial<SearchFilters>) =>
  apiRequest<ReservationResponse[]>(`${PATH}/search`, {
    method: "POST",
    body: JSON.stringify(criteria),
  });

export const approveReservation = (id: number) =>
  apiRequest<void>(`${PATH}/approve/${id}`, { method: "PUT" });

export const rejectReservation = (id: number) =>
  apiRequest<void>(`${PATH}/reject/${id}`, { method: "PUT" });
