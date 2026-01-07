import type { Room } from "../types/Room";
import type { RoomSearchRequest } from "../types/RoomSearchRequest";

const BASE_URL = "http://localhost:8080/api";

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${BASE_URL}/rooms`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Could not fetch rooms:", error);
    throw error;
  }
};

export const searchRooms = async (
  filters: RoomSearchRequest
): Promise<Room[]> => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v != null)
  );
  try {
    const response = await fetch(`${BASE_URL}/rooms/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanFilters),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};
