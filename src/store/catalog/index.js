import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  initState() {
    return {
      list: [],
      totalCount: 0,
    };
  }

  async load({ limit, skip }) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();

    const totalCount = json.result.totalCount > 0 ? json.result.totalCount : 0;

    this.setState(
      {
        ...this.getState(),
        list: json.result.items || [],
        totalCount: totalCount,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
