import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function Item({ item, onAdd = () => {} }) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${item._id}`); // Переход на страницу товара
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Предотвращение всплытия клика
    onAdd(item._id); // Добавление товара в корзину
  };

  const translate = useTranslation();

  return (
    <div className={cn()} onClick={handleClick}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)}{translate('currency.rub')}</div>
        <button onClick={handleAddToCart}>{translate('controls.add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
