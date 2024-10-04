import StoreModule from '../module';

class AuthState extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    const token = localStorage.getItem('authToken');
    return {
      token: token || null,
      user: null,
      isAuthenticated: !!token,
      loading: false,
    };
  }

  async login(username, password) {
    this.setState({ ...this.getState(), loading: true });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
          remember: true,
        }),
      });

      const data = await response.json();

      if (response.ok && data.result) {
        const { token, user } = data.result;
        this.setAuthState(token, user, true);
        console.log('Успешно авторизован:', user);
        return token;
      } else {
        const errorMessage =
          data.error?.data?.issues?.[0]?.message || 'Неизвестная ошибка при авторизации';
        console.error('Ошибка авторизации:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    } finally {
      this.setState({ ...this.getState(), loading: false });
    }
  }

  async logout() {
    this.setState({ ...this.getState(), loading: true });
    try {
      const token = this.getState().token;
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при выходе');
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error.message);
    } finally {
      this.setAuthState(null, null, false);
      this.setState({ ...this.getState(), loading: false });
    }
  }

  async checkAuth() {
    this.setState({ ...this.getState(), loading: true });
    const token = this.getState().token;
    if (token) {
      try {
        const response = await fetch('/api/v1/users/self?fields=_id,email,profile(name,phone)', {
          headers: { 'X-Token': token, 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.result) {
            this.setAuthState(token, data.result, true);
          } else {
            this.logout();
          }
        } else {
          throw new Error('Ошибка проверки авторизации');
        }
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error.message);
        this.logout();
      }
    }
    this.setState({ ...this.getState(), loading: false });
  }

  setAuthState(token, user, isAuthenticated) {
    this.setState({
      token,
      user,
      isAuthenticated,
    });
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  async fetchWithAuth(url, options = {}) {
    const token = this.getState().token;
    if (token) {
      options.headers = {
        ...options.headers,
        'X-Token': token,
      };
    }
    return fetch(url, options);
  }
}

export default AuthState;
