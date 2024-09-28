import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormatByLanguage } from '../../utils';
import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function ItemBasket({ item, onRemove, onClose }) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const translate = useTranslation();
  const language = translate('currency.rub');

  const handleItemClick = () => {
    onClose(); // Закрываем модальное окно перед навигацией
    navigate(`/product/${item._id}`); // Переход на страницу товара
  };

  return (
    <div className={cn()} onClick={handleItemClick} style={{ cursor: 'pointer' }}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormatByLanguage(item.price, language)} ₽</div>
        <div className={cn('cell')}>{numberFormatByLanguage(item.amount || 0, language)} шт</div>
        <div className={cn('cell')}>
          <button
            onClick={e => {
              e.stopPropagation();
              onRemove(item._id);
            }}
          >
            {translate('controls.remove')}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
};

export default memo(ItemBasket);
