import { AUTH_CONFIG } from '../config/constants';

export const validateCredentials = (email: string, password: string) => {
  const { TEMP_ADMIN } = AUTH_CONFIG;
  return email === TEMP_ADMIN.email && password === TEMP_ADMIN.password;
};