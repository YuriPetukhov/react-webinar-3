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
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`,
    );
    const json = await response.json();

    console.log(json);

    const totalCount = json.result.count || 0;
    const items = json.result.items || [];

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
