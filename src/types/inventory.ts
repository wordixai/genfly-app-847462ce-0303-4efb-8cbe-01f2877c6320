export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  room: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  serialNumber?: string;
  model?: string;
  brand?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  photos: string[];
  receipt?: string;
  warranty?: {
    expiryDate: string;
    provider: string;
  };
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Room {
  id: string;
  name: string;
}

export type SortField = 'name' | 'category' | 'room' | 'purchaseDate' | 'currentValue';
export type SortOrder = 'asc' | 'desc';

export interface InventoryFilters {
  search: string;
  category: string;
  room: string;
  condition: string;
  priceRange: [number, number];
}