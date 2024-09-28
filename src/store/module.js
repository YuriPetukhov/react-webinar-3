/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
class StoreModule {
  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.name];
  }

  setState(newState, description = 'setState') {
    const updateFunction = typeof newState === 'function'
      ? newState
      : () => newState;

    this.store.setState(prevState => {
      return {
        ...prevState,
        [this.name]: {
          ...prevState[this.name],
          ...updateFunction(prevState[this.name])
        }
      };
    }, description);
  }
}

export default StoreModule;
