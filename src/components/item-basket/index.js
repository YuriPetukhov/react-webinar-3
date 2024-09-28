import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const translate = useTranslation();

  const callbacks = {
    // Удаление товара
    onRemove: e => {
      e.stopPropagation(); // Предотвращаем всплытие события
      props.onRemove(props.item._id);
    },

    // Переход на страницу товара
    onItemClick: () => {
      props.onClose(); // Закрываем модальное окно перед навигацией
      navigate(`/product/${props.item._id}`); // Навигация на страницу товара
    },
  };

  return (
    <div className={cn()} onClick={callbacks.onItemClick}>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('controls.remove')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  onClose: PropTypes.func, // Добавляем onClose для закрытия модалки
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {}, // По умолчанию пустая функция
};

export default memo(ItemBasket);
