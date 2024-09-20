import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '/utils';
import Cart from '../cart';
import './style.css';

function CartModal({ cartItems, onClose, onRemoveAll, totalPrice }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>Корзина</h1>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <Cart cartItems={cartItems} onRemoveAll={onRemoveAll} />
        <div className="modal-footer">
          <p className="total-label">Итого</p>
          <p className="total-price">{formatPrice(totalPrice)} ₽</p>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cartItems: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveAll: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
