import { apiRequest } from "./apiClient";
import type {
  Room,
  RoomSearchRequest,
  CreateRoomRequest,
  UpdateRoomRequest,
} from "../types/room";

const PATH = "/rooms";

export const fetchRooms = (): Promise<Room[]> => apiRequest(PATH);
export const searchRooms = async (
  filters: RoomSearchRequest
): Promise<Room[]> => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v != null)
  );

  return apiRequest(`${PATH}/search`, {
    method: "POST",
    body: JSON.stringify(cleanFilters),
  });
};

export const createRoom = (data: CreateRoomRequest) =>
  apiRequest<void>("/rooms", { method: "POST", body: JSON.stringify(data) });

export const updateRoom = (id: number, data: UpdateRoomRequest) =>
  apiRequest<void>(`/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteRoom = (id: number): Promise<void> =>
  apiRequest(`${PATH}/${id}`, {
    method: "DELETE",
  });
