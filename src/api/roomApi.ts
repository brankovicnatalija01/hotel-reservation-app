import { apiRequest } from "./apiClient";
import type { Room, RoomSearchRequest } from "../types/room";

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
