import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '/utils';
import './style.css';

function CartModal({ cartItems, onClose, onRemoveAll }) {
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>Корзина</h1>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <ul>
          {cartItems.map((item, index) => (
            <li key={item.code} className="cart-item">
              <span className="item-index">{index + 1}.</span>
              <span className="item-title">{item.title}</span>
              <span className="item-price">{formatPrice(item.price)} ₽</span>
              <span className="item-quantity">{item.quantity} шт.</span>
              <button className="remove-button" onClick={() => onRemoveAll(item.code)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <div className="modal-footer">
          <p className="total-label">Итого</p>
          <p className="total-price">{formatPrice(totalPrice)} ₽</p>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  onClose: PropTypes.func,
  onRemoveAll: PropTypes.func,
};

export default React.memo(CartModal);
