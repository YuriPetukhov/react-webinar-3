import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
