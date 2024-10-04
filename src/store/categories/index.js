import StoreModule from '../module';
import { formatCategories } from '../../utils.js';

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      loading: false,
      error: null,
    };
  }

  async fetchCategories() {
    this.setState({ ...this.getState(), loading: true, error: null });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const data = await response.json();

      if (data.result && data.result.items && Array.isArray(data.result.items)) {
        const formattedCategories = formatCategories(data.result.items);
        this.setState({
          list: formattedCategories,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('Нет данных категорий или неверный формат');
      }
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
      this.setState({
        ...this.getState(),
        loading: false,
        error: error.message,
      });
    }
  }
}

export default CategoriesState;
