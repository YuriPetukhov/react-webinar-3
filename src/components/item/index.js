import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormatByLanguage } from '../../utils';
import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function Item({ item, onAdd = () => {}, productLink }) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(productLink || `/product/${item._id}`); // Переход на указанный адрес или по умолчанию
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Предотвращение всплытия клика
    onAdd(item._id); // Добавление товара в корзину
  };

  const translate = useTranslation();
  const language = translate('currency.rub');

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={handleClick}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormatByLanguage(item.price, language)} {language}
        </div>
        <button onClick={handleAddToCart}>{translate('controls.add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func,
  productLink: PropTypes.string, // Новое свойство
};

export default memo(Item);
