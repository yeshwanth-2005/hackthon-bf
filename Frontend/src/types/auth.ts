export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}