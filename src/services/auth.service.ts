import api from './api.axios';

export const loginApi = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};
