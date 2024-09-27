import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useTranslation } from '../../use-translation';

function Main() {
  const store = useStore();
  const translate = useTranslation();

  // Состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Количество записей на странице


  useEffect(() => {
    // Загружаем данные при изменении страницы
    store.actions.catalog.load({ limit, skip: (currentPage - 1) * limit });
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalCount: state.catalog.totalCount, // общее количество товаров для пагинации
  }));

  console.log('Total Count:', select.totalCount);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <PageLayout>
      <Head title={translate('main.title')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalCount={select.totalCount}
        limit={limit}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
