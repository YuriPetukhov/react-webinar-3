import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '/utils';
import './style.css';

function Item({ item, onAddToCart }) {
  const handleAddToCart = e => {
    e.stopPropagation();
    onAddToCart(item.code);
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{formatPrice(item.price)} ₽</div>
      <div className="Item-actions">
        <button onClick={handleAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
