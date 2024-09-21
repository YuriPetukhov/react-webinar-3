import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart({ cartItems, onRemoveAll }) {
  const renderCartInfo = item => (
    <>
      <span className="Cart-quantity">{item.quantity} шт</span>
      <button className="Cart-remove-button" onClick={() => onRemoveAll(item.code)}>
        Удалить
      </button>
    </>
  );

  return (
    <div className="Cart">
      <List list={cartItems} onAddToCart={() => {}} renderItemInfo={renderCartInfo} />
    </div>
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
