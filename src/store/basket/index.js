import StoreModule from '../module';

class Basket extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.state = this.initState();
  }

  initState() {
    const savedBasket = JSON.parse(localStorage.getItem('basket')) || {
      list: [],
      sum: 0,
      amount: 0,
    };

    // Пересчитываем сумму и количество уникальных товаров при инициализации
    const sum = savedBasket.list.reduce((total, item) => total + item.price * item.amount, 0);
    const amount = savedBasket.list.length; // Количество уникальных товаров

    return {
      list: savedBasket.list,
      sum: sum,
      amount: amount,
    };
  }

  setState = (newState, actionDescription) => {
    localStorage.setItem('basket', JSON.stringify(newState));
    super.setState(newState, actionDescription);
  };

  addToBasket = _id => {
    const currentState = this.getState();
    if (!currentState.list) {
      console.error('Корзина не инициализирована должным образом!');
      return;
    }

    let sum = 0;
    const list = [...currentState.list];
    const item = this.store.getState().catalog.list.find(item => item._id === _id);

    // Проверяем, есть ли товар в корзине
    const existingItem = list.find(item => item._id === _id);
    if (existingItem) {
      // Если товар уже есть, увеличиваем его количество
      existingItem.amount += 1;
    } else {
      // Если товара нет, добавляем его
      list.push({ ...item, amount: 1 });
    }

    // Пересчитываем сумму
    sum = list.reduce((total, item) => total + item.price * item.amount, 0);

    const newAmount = list.length; // Количество уникальных товаров

    this.setState(
      {
        list: list,
        sum: sum,
        amount: newAmount,
      },
      'Добавление в корзину',
    );
  };

  removeFromBasket = _id => {
    const currentState = this.getState();
    let sum = 0;
    const list = currentState.list.filter(item => {
      if (item._id === _id) return false; // Удаляем товар
      sum += item.price * item.amount; // Пересчитываем сумму
      return true;
    });

    const newAmount = list.length; // Количество уникальных товаров

    this.setState(
      {
        list: list,
        sum: sum,
        amount: newAmount,
      },
      'Удаление из корзины',
    );
  };
}

export default Basket;
