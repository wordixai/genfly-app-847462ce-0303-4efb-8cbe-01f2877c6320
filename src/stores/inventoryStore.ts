import { create } from 'zustand';
import { InventoryItem, Category, Room, InventoryFilters, SortField, SortOrder } from '@/types/inventory';
import { v4 as uuidv4 } from 'uuid';

interface InventoryState {
  items: InventoryItem[];
  categories: Category[];
  rooms: Room[];
  filters: InventoryFilters;
  sortField: SortField;
  sortOrder: SortOrder;
  
  // Actions
  addItem: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  setFilters: (filters: Partial<InventoryFilters>) => void;
  setSorting: (field: SortField, order: SortOrder) => void;
  getFilteredItems: () => InventoryItem[];
  getTotalValue: () => number;
  getItemsByCategory: () => Record<string, number>;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Electronics', color: '#3B82F6', icon: 'Smartphone' },
  { id: '2', name: 'Furniture', color: '#10B981', icon: 'Armchair' },
  { id: '3', name: 'Appliances', color: '#F59E0B', icon: 'Zap' },
  { id: '4', name: 'Jewelry', color: '#EF4444', icon: 'Gem' },
  { id: '5', name: 'Clothing', color: '#8B5CF6', icon: 'Shirt' },
  { id: '6', name: 'Tools', color: '#6B7280', icon: 'Wrench' },
  { id: '7', name: 'Sports', color: '#06B6D4', icon: 'Trophy' },
  { id: '8', name: 'Books', color: '#84CC16', icon: 'Book' },
];

const defaultRooms: Room[] = [
  { id: '1', name: 'Living Room' },
  { id: '2', name: 'Bedroom' },
  { id: '3', name: 'Kitchen' },
  { id: '4', name: 'Bathroom' },
  { id: '5', name: 'Office' },
  { id: '6', name: 'Garage' },
  { id: '7', name: 'Basement' },
  { id: '8', name: 'Attic' },
];

// Sample data
const sampleItems: InventoryItem[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    description: 'Apple MacBook Pro 16-inch laptop',
    category: 'Electronics',
    room: 'Office',
    purchaseDate: '2023-01-15',
    purchasePrice: 2499,
    currentValue: 2000,
    serialNumber: 'ABC123456',
    model: 'MacBook Pro 16"',
    brand: 'Apple',
    condition: 'excellent',
    photos: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'],
    tags: ['work', 'computer'],
    notes: 'Primary work laptop',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Samsung 65" TV',
    description: 'Samsung QLED 65-inch Smart TV',
    category: 'Electronics',
    room: 'Living Room',
    purchaseDate: '2022-11-20',
    purchasePrice: 1200,
    currentValue: 900,
    serialNumber: 'SAM789',
    model: 'QN65Q70A',
    brand: 'Samsung',
    condition: 'good',
    photos: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'],
    tags: ['entertainment'],
    createdAt: '2022-11-20T14:30:00Z',
    updatedAt: '2022-11-20T14:30:00Z',
  },
];

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: sampleItems,
  categories: defaultCategories,
  rooms: defaultRooms,
  filters: {
    search: '',
    category: '',
    room: '',
    condition: '',
    priceRange: [0, 10000],
  },
  sortField: 'name',
  sortOrder: 'asc',

  addItem: (itemData) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },

  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      ),
    }));
  },

  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  addCategory: (categoryData) => {
    const newCategory: Category = {
      ...categoryData,
      id: uuidv4(),
    };
    set((state) => ({
      categories: [...state.categories, newCategory],
    }));
  },

  addRoom: (roomData) => {
    const newRoom: Room = {
      ...roomData,
      id: uuidv4(),
    };
    set((state) => ({
      rooms: [...state.rooms, newRoom],
    }));
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  setSorting: (field, order) => {
    set({ sortField: field, sortOrder: order });
  },

  getFilteredItems: () => {
    const { items, filters, sortField, sortOrder } = get();
    
    let filtered = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesRoom = !filters.room || item.room === filters.room;
      const matchesCondition = !filters.condition || item.condition === filters.condition;
      const matchesPrice = item.currentValue >= filters.priceRange[0] && 
        item.currentValue <= filters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesRoom && matchesCondition && matchesPrice;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'purchaseDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? result : -result;
    });

    return filtered;
  },

  getTotalValue: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.currentValue, 0);
  },

  getItemsByCategory: () => {
    const { items } = get();
    return items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  },
}));