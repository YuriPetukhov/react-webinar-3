/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
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
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование списка категорий в иерархическую структуру с отступами
 * @param {Array} categories - Плоский список категорий
 * @returns {Array} Отформатированный список категорий с иерархией и отступами
 */

export function formatCategories(categories) {
  const categoryMap = {};

  categories.forEach(cat => {
    categoryMap[cat._id] = { ...cat, children: [] };
  });

  categories.forEach(cat => {
    if (cat.parent && categoryMap[cat.parent._id]) {
      categoryMap[cat.parent._id].children.push(categoryMap[cat._id]);
    }
  });

  const formatWithIndent = (cat, level = 0) => {
    if (!cat || !cat.children) return [];
    return [
      { _id: cat._id, title: '- '.repeat(level) + ' ' + cat.title },
      ...cat.children.flatMap(child => formatWithIndent(child, level + 1)),
    ];
  };

  return Object.values(categoryMap)
    .filter(cat => !cat.parent)
    .flatMap(cat => formatWithIndent(cat));
}
