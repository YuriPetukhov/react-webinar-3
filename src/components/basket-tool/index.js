import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormatByLanguage, plural } from '../../utils';
import useSelector from '../../store/use-selector';
import { useTranslation } from '../../language-settings/use-translation';
import MainMenu from '../main-menu';
import './style.css';

function BasketTool({ onOpen }) {
  const cn = bem('BasketTool');
  const translate = useTranslation();
  const language = translate('currency.rub');

  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));

  const { sum, amount } = select;

  return (
    <div className={cn('container')}>
      <MainMenu />
      <div className={cn('content')}>
        <span className={cn('label')}>{translate('basket.itemsInBasket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: translate('basket.productOne'),
                few: translate('basket.productFew'),
                many: translate('basket.productMany'),
              })} / ${numberFormatByLanguage(sum, language)} ${language}`
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
