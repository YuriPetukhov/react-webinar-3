import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../use-translation';
import './style.css';

function BasketTool({ onOpen }) {
  const cn = bem('BasketTool');
  const translate = useTranslation();

  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));

  const { sum, amount } = select;

  return (
    <div className={cn('container')}>
      <Link to="/" className={cn('link')}>{translate('header.home')}</Link>
      <div className={cn('content')}>
        <span className={cn('label')}>{translate('basket.itemsInBasket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: translate('basket.productOne'),
                few: translate('basket.productFew'),
                many: translate('basket.productMany'),
              })} / ${numberFormat(sum)} ${translate('currency.rub')}`
            : `${translate('basket.empty')}`}
        </span>
        <button onClick={onOpen}>{translate('basket.goToBasket')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default memo(BasketTool);
