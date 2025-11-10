export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userType: "Buyer" | "Owner" | "Agent" | "Builder";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: "Buyer" | "Owner" | "Agent" | "Builder";
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}