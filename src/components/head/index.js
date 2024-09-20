import React from 'react';
import PropTypes from 'prop-types';
import { formatCartInfo } from '/utils';
import './style.css';
import Controls from '../controls';

function Head({ title, totalItems = 0, totalPrice = 0, onAdd }) {
  return (
    <div>
      <div className="HeaderTitle">
        <h1>{title}</h1>
      </div>
      <div className="CartInfoControls">
        <p>
          В корзине: <strong>{formatCartInfo(totalItems, totalPrice)}</strong>
        </p>
        <Controls onAdd={onAdd} />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
  onAdd: PropTypes.func,
};

export default React.memo(Head);
