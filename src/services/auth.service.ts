import { VerifyAuthResponse } from '@/lib/types';
import api  from '@/services/axiosApi';
const baseSuperUser = "/admin/superuser/dashboard";

export const login = async (email: string, password: string) => {
  return api.post(`${baseSuperUser}/login`, { email, password });
};

export const register = async (email: string, password: string, name: string, lastName: string) => {
  return api.post(`${baseSuperUser}/register`, { email, password, name, lastName });
};

export const verifyAuth = async (): Promise<VerifyAuthResponse> => {
  try {
    const response = await api.get<VerifyAuthResponse>(`${baseSuperUser}/protected`);

    // Asegúrate de que la respuesta tiene la estructura esperada
    const { data } = response;

    if (data && data.authorized) {
      return {
        authorized: data.authorized,
        user: data.user,
        message: data.message
      };
    } else {
      throw new Error('Failed to verify authentication');
    }
  } catch (error) {
    console.error('Error verifying authentication:', error);
    throw new Error('Failed to verify authentication');
  }
};

export const logout = async () => {
  return api.get(`${baseSuperUser}/logout`);
}