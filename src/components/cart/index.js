import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '/utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart({ cartItems, onRemoveAll }) {
  const cn = bem('Cart');

  return (
    <ul className={cn('list')}>
      {cartItems.map(item => (
        <li key={item.code} className={cn('item')}>
          <span className={cn('index')}>{item.originalIndex + 1}</span>
          <span className={cn('title')}>{item.title}</span>
          <span className={cn('price')}>{formatPrice(item.price)} ₽</span>
          <span className={cn('quantity')}>{item.quantity} шт</span>
          <button className={cn('remove-button')} onClick={() => onRemoveAll(item.code)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemoveAll: PropTypes.func.isRequired,
};

export default React.memo(Cart);
