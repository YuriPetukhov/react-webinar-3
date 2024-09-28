import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function BasketTotal({ sum }) {
  const cn = bem('BasketTotal');
  const translate = useTranslation();
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate('basket.total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)}{translate('currency.rub')}</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
