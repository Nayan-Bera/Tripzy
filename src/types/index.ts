export type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
};

export type Room = {
  id: string;
  title: string;
  description: string;
  price: number;
  images?: string[];
  beds: number;
  guests: number;
  rating?: number;
};

export type Hotel = {
  id: string;
  name: string;
  location: string;
  description?: string;
  rooms: Room[];
  cover?: string;
  rating?: number;
};
