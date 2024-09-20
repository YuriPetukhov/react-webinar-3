class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      ...initState,
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener());
  }

  addItemToCart = code => {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    const existingItem = this.state.cartItems.find(cartItem => cartItem.code === code);

    let newCartItems;
    let totalItems = this.state.totalItems;

    if (existingItem) {
      newCartItems = this.state.cartItems.map(cartItem =>
        cartItem.code === code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      );
    } else {
      newCartItems = [...this.state.cartItems, { ...item, quantity: 1 }];
      totalItems += 1;
    }

    const totalPrice = newCartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0,
    );

    this.setState({
      cartItems: newCartItems,
      totalItems,
      totalPrice,
    });
  };

  removeItemFromCart = code => {
    const newCartItems = this.state.cartItems.filter(cartItem => cartItem.code !== code);
    const totalItems = newCartItems.length;
    const totalPrice = newCartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0,
    );

    this.setState({
      cartItems: newCartItems,
      totalItems,
      totalPrice,
    });
  };

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export default Store;
