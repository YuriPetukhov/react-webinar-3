import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      console.log('Токен восстановлен из localStorage:', storedToken);
      return storedToken;
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (username, password) => {
    try {
      const data = { login: username, password: password, remember: true };
      const response = await axios.post('/api/v1/users/sign', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data && response.data.result) {
        const { token, user } = response.data.result;
        setToken(token);
        localStorage.setItem('authToken', token);
        setUser(user);
        console.log('Успешно авторизован:', user);
      } else {
        console.error('Некорректный ответ от сервера:', response.data);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error.response ? error.response.data : error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/v1/users/signout', {}, { headers: { 'X-Token': token } });
    } catch (error) {
      console.error('Ошибка при выходе:', error.response ? error.response.data : error.message);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const fetchUser = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get('/api/v1/users/self?fields=_id,email,profile(name,phone)', {
        headers: { 'X-Token': token, 'Content-Type': 'application/json' },
      });
      setUser(response.data.result);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
    }
  }, [token]);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['X-Token'] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);