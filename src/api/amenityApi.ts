import type { Amenity } from "../types/Amenity";

const BASE_URL = "http://localhost:8080/api";

export const fetchAmenities = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/amenities`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Amenity[] = await response.json();

    // Transform the array of objects [{name: "WiFi"}] into an array of strings ["WiFi"]
    return data.map((amenity) => amenity.name);
  } catch (error) {
    console.error("Could not fetch amenities:", error);
    return [];
  }
};
