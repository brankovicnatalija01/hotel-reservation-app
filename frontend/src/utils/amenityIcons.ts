import {
  Wifi,
  Tv,
  Coffee,
  Snowflake,
  Waves,
  ShieldCheck,
  Wind,
  Sun,
  BellRing,
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
  Jacuzzi: Waves,
  "Safe Box": ShieldCheck,
  Hairdryer: Wind,
  Balcony: Sun,
  "Room Service": BellRing,
};

export const getAmenityIcon = (name: string) => {
  return AMENITY_ICONS[name] || HelpCircle;
};
