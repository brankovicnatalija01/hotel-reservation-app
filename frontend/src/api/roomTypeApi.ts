import { apiRequest } from "./apiClient";
import type { RoomType } from "../types/roomType";

const PATH = "/room-types";

export const getAllRoomTypes = async (): Promise<RoomType[]> => {
  try {
    const data = await apiRequest<RoomType[]>(PATH);
    return data;
  } catch (error) {
    console.error("Could not fetch room types:", error);
    return [];
  }
};
