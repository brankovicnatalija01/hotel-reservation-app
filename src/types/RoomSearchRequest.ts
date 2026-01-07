export interface RoomSearchRequest {
  capacity?: number;
  amenities?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
  checkIn?: string;
  checkOut?: string;
}
