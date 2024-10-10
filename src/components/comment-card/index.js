import { memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import SideLayout from '../side-layout';
import './style.css';

function CommentCard({
  id,
  author,
  date,
  text,
  onAnswerClick,
  answerLabel,
  sessionExists,
  loginPath,
  t,
}) {
  const { pathname } = useLocation();
  const cn = bem('CommentCard');

  return (
    <div className={cn()}>
      <div className={cn('row')}>
        <SideLayout>
          <span className={cn('author')}>{author}</span>
          <span className={cn('date')}>{date}</span>
        </SideLayout>
      </div>
      <div className={cn('row')}>
        <div className={cn('text')}>{text}</div>
      </div>
      <div className={cn('row')}>
        {sessionExists ? (
          <HashLink smooth to={`${pathname}#${id}`}>
            <span className={cn('answer')} onClick={() => onAnswerClick()}>
              {answerLabel}
            </span>
          </HashLink>
        ) : (
          <Link
            to={loginPath}
            state={{ back: location.pathname + location.search + location.hash }}
            className={cn('login-link')}
          >
            {t('comments.LogInToReply')}
          </Link>
        )}
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  onAnswerClick: PropTypes.func,
  answerLabel: PropTypes.string,
  sessionExists: PropTypes.bool,
  loginPath: PropTypes.string,
};

export default memo(CommentCard);
