import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function Controls({ onAdd }) {
  const translate = useTranslation();
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{translate('controls.add')}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
