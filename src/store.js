/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.nextCode = Math.max(0, ...this.state.list.map(item => item.code)) + 1; // Начинаем с максимального текущего кода + 1

    this.state.list = this.state.list.map(item => ({
      ...item,
      selectionCount: item.selectionCount || 0, // Устанавливаем 0 если еще не определено
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
   * Добавление новой записи
   */
  addItem() {
    // Добавляем запись с уникальным кодом и увеличиваем nextCode
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.nextCode, title: 'Новая запись', selectionCount: 0 }],
    });
    this.nextCode += 1; // Увеличиваем счетчик для следующей записи
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
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
          // Если выделение включается, увеличиваем счетчик
          const newSelectionCount = item.selected ? item.selectionCount : item.selectionCount + 1;
          return {
            ...item,
            selected: !item.selected,
            selectionCount: newSelectionCount
          };
        }
        return {
          ...item,
          selected: false, // Снимаем выделение с других записей
        };
      }),
    });
  }
}

export default Store;
