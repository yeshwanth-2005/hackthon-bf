import React, { createContext, useContext, useState } from 'react';
import type { Admin, AuthState } from '../types/auth';
import { validateCredentials } from '../utils/auth';
import { AUTH_CONFIG } from '../config/constants';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    admin: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      if (validateCredentials(email, password)) {
        const admin: Admin = {
          id: AUTH_CONFIG.TEMP_ADMIN.id,
          email: AUTH_CONFIG.TEMP_ADMIN.email,
          name: AUTH_CONFIG.TEMP_ADMIN.name,
          role: 'admin',
        };
        setAuthState({
          admin,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      admin: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}