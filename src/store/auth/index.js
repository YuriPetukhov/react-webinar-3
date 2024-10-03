import StoreModule from '../module';
import axios from 'axios';

class AuthState extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  // Начальное состояние
  initState() {
    return {
      token: localStorage.getItem('authToken') || null,
      user: null,
      isAuthenticated: false,
    };
  }

  // Действие для входа
  async login(username, password) {
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: username,
        password: password,
        remember: true,
      });

      const data = response.data;

      if (data && data.result) {
        const { token, user } = data.result;
        console.log('data result', data.result);

        // Обновляем состояние хранилища
        this.store.setState({
          ...this.store.getState(),
          [this.name]: {
            token,
            user,
            isAuthenticated: true,
          },
        });

        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', token);
      } else {
        console.error('Некорректный ответ сервера');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error.response ? error.response.data : error.message);
    }
  }

  // Действие для выхода
  logout() {
    localStorage.removeItem('authToken');
    this.store.setState({
      ...this.store.getState(),
      [this.name]: {
        token: null,
        user: null,
        isAuthenticated: false,
      },
    });
  }

  // Проверка на наличие токена и автоматическая авторизация
  async checkAuth() {
    const token = localStorage.getItem('authToken'); // Получаем токен из localStorage
    if (token) {
      try {
        const response = await axios.get('/api/v1/users/self?fields=_id,email,profile(name,phone)', {
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        if (data && data.result) {
          this.store.setState({
            ...this.store.getState(),
            [this.name]: {
              ...this.store.getState()[this.name],
              user: data.result,
              isAuthenticated: true,
            },
          });
        } else {
          this.logout(); // Если токен невалиден
        }
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error.response ? error.response.data : error.message);
        this.logout(); // Обрабатываем ошибки
      }
    }
  }
  
}

export default AuthState;
