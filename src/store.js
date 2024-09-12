/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    // Инициализируем список существующих кодов
    this.existingCodes = new Set(this.state.list.map(item => item.code));

    this.state.list = this.state.list.map(item => ({
      ...item,
      selectionCount: item.selectionCount || 0, // Устанавливаем 0, если еще не определено
    }));
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Генерация уникального кода
   * @returns {number}
   */
  generateUniqueCode() {
    let newCode = 1;
    while (this.existingCodes.has(newCode)) {
      newCode += 1;
    }
    this.existingCodes.add(newCode);
    return newCode;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const uniqueCode = this.generateUniqueCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: uniqueCode, title: 'Новая запись', selectionCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    // Удаляем код из набора существующих кодов
    this.existingCodes.delete(code);

    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelectionCount = item.selected ? item.selectionCount : item.selectionCount + 1;
          return {
            ...item,
            selected: !item.selected,
            selectionCount: newSelectionCount,
          };
        }
        return {
          ...item,
          selected: false,
        };
      }),
    });
  }
}

export default Store;
