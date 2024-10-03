import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      profileData: null,
      waiting: false,
      error: null,
    };
  }

  async fetchProfile(token) {
    this.setState({ waiting: true, error: null });
    console.log("Token 2", token);

    try {
      const response = await fetch('/api/v1/users/self?fields=_id,email,profile(name,phone', {
        headers: {
          'X-Token': token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ profileData: data.result, waiting: false });
      } else {
        this.setState({ error: 'Не удалось загрузить профиль', waiting: false });
      }
    } catch (error) {
      this.setState({ error: 'Ошибка при получении данных', waiting: false });
    }
  }
}

export default ProfileState;
