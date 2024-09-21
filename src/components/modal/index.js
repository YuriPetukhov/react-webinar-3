import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ title, onClose, children }) {
  return (
    <div className="Modal">
      <div className="Modal-content">
        <div className="Modal-header">
          <h1>{title}</h1>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div className="Modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Modal);
