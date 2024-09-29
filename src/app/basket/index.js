import { memo, useCallback, useState } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useTranslation } from '../../language-settings/use-translation';
import Pagination from '../../components/pagination';

function Basket() {
  const store = useStore();
  const translate = useTranslation();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // Состояние для отслеживания текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Количество товаров на странице

  // Логика для получения нужных товаров для текущей страницы
  const paginatedList = select.list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const callbacks = {
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal} />;
      },
      [callbacks.removeFromBasket, callbacks.closeModal]
    ),
  };

  return (
    <ModalLayout title={translate('basket.title')} onClose={callbacks.closeModal}>
      <List list={paginatedList} renderItem={renders.itemBasket} />
      <Pagination
        totalCount={select.list.length}    // Общее количество товаров
        limit={itemsPerPage}               // Лимит товаров на одной странице
        currentPage={currentPage}          // Текущая страница
        onPageChange={setCurrentPage}      // Функция для изменения страницы
      />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
