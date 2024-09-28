import StoreModule from '../module';

class Basket extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.state = this.initState();
  }

  initState() {
    const savedBasket = JSON.parse(localStorage.getItem('basket')) || { list: [], sum: 0, amount: 0 };
    return savedBasket;
  }

  setState = (newState, actionDescription) => {
    localStorage.setItem('basket', JSON.stringify(newState));
    super.setState(newState, actionDescription);
  }

  addToBasket = (_id) => {
    console.log('Current state:', this.getState());
    const currentState = this.getState();
    console.log('addToBasket called', this);
  if (!currentState.list) {
    console.error("Корзина не инициализирована должным образом!");
    return;
  }
    let sum = 0;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    const item = this.store.getState().catalog.list.find(item => item._id === _id);
    if (!list.some(item => item._id === _id)) {
      list.push({ ...item, amount: 1 });
      sum += item.price;
    }

    const newAmount = list.reduce((acc, item) => acc + item.amount, 0);

    this.setState(
      {
        ...this.state,
        list: list,
        sum: sum,
        amount: newAmount,
      },
      'Добавление в корзину',
    );
  }

  removeFromBasket = (_id) => {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    const newAmount = list.reduce((acc, item) => acc + item.amount, 0);

    this.setState(
      {
        ...this.state,
        list: list,
        sum: sum,
        amount: newAmount,
      },
      'Удаление из корзины',
    );
  }
}

export default Basket;
