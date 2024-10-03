import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Создание контекста
const AuthContext = createContext();

// Провайдер для управления состоянием авторизации
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const isAuthenticated = !!user;

  // Функция для входа
  const login = useCallback(async (username, password) => {
    try {
      const data = {
        login: username,
        password: password,
        remember: true,
      };
  
      const response = await axios.post('/api/v1/users/sign', data, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Проверка структуры ответа
      console.log('Ответ от сервера:', response.data);
  
      if (response.data && response.data.result) {
        const { token, user } = response.data.result;
        setToken(token);
        localStorage.setItem('token', token);
        setUser(user);
        console.log('Успешно авторизован:', response.data);
      } else {
        console.error('Некорректный ответ от сервера:', response.data);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error.response ? error.response.data : error.message);
    }
  }, []);

  // Функция для выхода
  const logout = useCallback(async () => {
    try {
      await axios.post('/profile'); // Предположим, что это эндпоинт выхода
    } catch (error) {
      console.error('Ошибка при выходе:', error.response ? error.response.data : error.message);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
    }
  }, []);

  // Автоматический вход при загрузке
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(
            '/api/v1/users/self?fields=_id,email,profile(name,phone)',
            {
              headers: {
                'X-Token': token,
                'Content-Type': 'application/json',
              },
            },
          );

          setUser(response.data.result);
        } catch (error) {
          // Если ошибка, сбрасываем состояние пользователя
          setUser(null);
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста авторизации
export const useAuth = () => {
  return useContext(AuthContext);
};
