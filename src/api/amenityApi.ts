import { apiRequest } from "./apiClient";
import type { Amenity } from "../types/amenity";

const PATH = "/amenities";

export const fetchAmenities = async (): Promise<string[]> => {
  try {
    const data = await apiRequest<Amenity[]>(PATH);
    return data.map((amenity) => amenity.name);
  } catch (error) {
    console.error("Could not fetch amenities:", error);
    return [];
  }
};
