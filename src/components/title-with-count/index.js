import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function TitleWithCount({ title, count = 0 }) {
  const cn = bem('TitleWithCount');

  return (
    <div className={cn()}>
      {title} ({count})
    </div>
  );
}

TitleWithCount.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default memo(TitleWithCount);