import { apiRequest } from "./apiClient";
import type { Amenity } from "../types/amenity";

const PATH = "/amenities";

export const getAmenities = async (): Promise<Amenity[]> => {
  try {
    const data = await apiRequest<Amenity[]>(PATH);
    return data; // Vraćamo ceo objekat [{id: 1, name: 'WiFi'}, ...]
  } catch (error) {
    console.error("Could not fetch amenities:", error);
    return [];
  }
};
