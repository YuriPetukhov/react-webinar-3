import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useTranslation } from '../../use-translation';

function Basket() {
  const store = useStore();
  const translate = useTranslation();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        // Передаем и onRemove, и onClose для каждого элемента
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal} />;
      },
      [callbacks.removeFromBasket, callbacks.closeModal]
    ),
  };

  return (
    <ModalLayout title={translate('basket.title')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
