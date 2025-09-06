
import type { ServicePackage } from "./types";

export const SERVICE_PACKAGES: ServicePackage = {
  'Exterior Detail': { basePrice: { 'Sedan': 150, 'SUV': 175, 'Truck/Van': 200 } },
  'Interior Detail': { basePrice: { 'Sedan': 175, 'SUV': 200, 'Truck/Van': 225 } },
  'Full Detail': { basePrice: { 'Sedan': 275, 'SUV': 325, 'Truck/Van': 375 } },
};

export const VEHICLE_SIZES: string[] = ['Sedan', 'SUV', 'Truck/Van'];

export const CONDITION_LEVELS: string[] = ['Excellent', 'Good', 'Fair', 'Poor'];

export const COMMON_ISSUES: string[] = [
  'Pet Hair',
  'Smoke Odor',
  'Heavy Stains',
  'Swirl Marks',
  'Tree Sap',
  'Mold/Mildew',
];
