/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
})();

export function formatPrice(price) {
  return price.toLocaleString('ru-RU'); // Форматируем число с пробелами между тысячами
}

/**
 * Возвращает строку с количеством товаров и их стоимостью
 * @param totalItems {Number} Количество товаров
 * @param totalPrice {Number} Общая стоимость
 * @returns {String} Строка с данными или "пусто"
 */
export function formatCartInfo(totalItems, totalPrice) {
  if (totalItems === 0) {
    return 'пусто';
  }

  // Если товары есть, возвращаем строку с количеством товаров и общей стоимостью
  return `${totalItems} ${plural(totalItems, { one: 'товар', few: 'товара', many: 'товаров' })} / ${formatPrice(totalPrice)} ₽`;
}
