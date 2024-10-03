import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          console.log('Токен восстановлен из localStorage:', storedToken);
          return storedToken;
        }
        return null;
      });
  
    const login = async (credentials) => {
      try {
        const response = await axios.post('/api/v1/users/sign', credentials);
        const newToken = response.data.result.token;
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
        // Получение данных пользователя после успешного входа
        await fetchUser(newToken);
      } catch (error) {
        console.error('Ошибка входа:', error);
        throw error;
      }
    };
  
    const logout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      navigate('/login');
    };
  
    const fetchUser = async (currentToken) => {
      try {
        const response = await axios.get('/api/v1/users/self', {
          headers: { 'X-Token': currentToken || token }
        });
        setUser(response.data.result);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        logout();
      }
    };
  
    useEffect(() => {
      if (token) {
        fetchUser();
      }
    }, [token]);
  
    return { token, user, login, logout };
  };