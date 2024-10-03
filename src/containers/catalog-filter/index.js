import { memo, useCallback, useMemo, useEffect, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import translate from '../../i18n/translate';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const [categories, setCategories] = useState([]);

  // Получение категорий из API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
        const data = await response.json();
        console.log("Categories ", data);
        if (data.result && data.result.items && Array.isArray(data.result.items)) {
          const formattedCategories = formatCategories(data.result.items);
          setCategories(formattedCategories);
      } else {
          console.error("Нет данных категорий или неверный формат:", data);
      }
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    }

    fetchCategories();
  }, []);

  // Форматирование категорий с учётом вложенности
  const formatCategories = (categories) => {
    // Проверка на валидный массив
    if (!Array.isArray(categories)) {
        console.error("Expected categories to be an array, got:", categories);
        return [];
    }

    const categoryMap = {};

    // Создание карты категорий
    categories.forEach(cat => {
        categoryMap[cat._id] = { ...cat, children: [] };
    });

    // Заполнение детей
    categories.forEach(cat => {
        if (cat.parent && categoryMap[cat.parent._id]) {
            categoryMap[cat.parent._id].children.push(categoryMap[cat._id]); // исправление, чтобы добавлять именно объект
        }
    });

    // Форматирование категорий с учётом вложенности
    const formatWithIndent = (cat, level = 0) => {
        if (!cat || !cat.children) return []; // Проверка, чтобы избежать ошибок
        return [
            { _id: cat._id, title: '-'.repeat(level) + ' ' + cat.title },
            ...cat.children.flatMap(child => formatWithIndent(child, level + 1)),
        ];
    };

    // Возврат отформатированных корневых категорий
    return Object.values(categoryMap)
        .filter(cat => !cat.parent) // Только корневые категории
        .flatMap(cat => formatWithIndent(cat));
};


  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category, // Добавлено поле для выбранной категории
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Выбор категории
    onCategoryChange: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]), // Сброс номера страницы
    // Сброс всех фильтров
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    categories: useMemo(
      () => [
        { value: '', title: 'Все' },
        ...categories.map(category => ({
          value: category._id,
          title: category.title,
        })),
      ],
      [categories],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategoryChange} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('filter.search')}
        delay={1000}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
