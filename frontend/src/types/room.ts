export interface Room {
  id: number;
  roomNumber: string;
  pricePerNight: number;
  description: string;
  propertyId: number;
  propertyName: string;
  roomTypeId: number;
  roomTypeName: string;
  roomTypeCapacity: number;
  roomTypeDescription: string;
  amenities: string[];
  imageUrls: string[];
}

export interface RoomSearchRequest {
  capacity?: number;
  amenities?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
  checkIn?: string;
  checkOut?: string;
}

export interface CreateRoomRequest {
  roomNumber: string;
  pricePerNight: number;
  description: string;
  propertyId: number;
  roomTypeId: number;
  amenityIds: number[];
}

export interface UpdateRoomRequest {
  roomTypeId: number;
  propertyId: number;
  amenityIds: number[];
}

export interface RoomResponse {
  id: number;
  roomNumber: string;
  pricePerNight: number;
  description: string;
  propertyId: number;
  propertyName: string;
  roomTypeId: number;
  roomTypeName: string;
  roomTypeDescription: string;
  roomTypeCapacity: number;
  amenities: string[];
  imageUrls: string[];
}
