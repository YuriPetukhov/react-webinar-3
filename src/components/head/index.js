import React from 'react';
import PropTypes from 'prop-types';
import { formatCartInfo } from '/utils';
import './style.css';

function Head({ title, totalItems = 0, totalPrice = 0 }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <p>
        В корзине: <strong>{formatCartInfo(totalItems, totalPrice)}</strong>
      </p>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(Head);
