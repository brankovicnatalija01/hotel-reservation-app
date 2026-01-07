import {
  Wifi,
  Tv,
  Coffee,
  Snowflake,
  Car,
  Wind,
  HelpCircle,
} from "lucide-react";
import React from "react";

/**
 * Global mapping of amenity names from the database
 * to Lucide React components.
 */
export const AMENITY_ICONS: Record<string, React.ElementType> = {
  WiFi: Wifi,
  TV: Tv,
  "Mini Bar": Coffee,
  AC: Snowflake,
  "Air Conditioning": Wind,
  Parking: Car,
};

/**
 * Helper function to get an icon by name with a fallback
 */
export const getAmenityIcon = (name: string) => {
  return AMENITY_ICONS[name] || HelpCircle;
};
