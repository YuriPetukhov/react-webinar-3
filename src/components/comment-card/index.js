import { memo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import SideLayout from '../side-layout';
import './style.css';

function CommentCard({
  id,
  author,
  authorId,
  date,
  text,
  onAnswerClick,
  answerLabel,
  sessionExists,
  loginPath,
  t,
  authorizedUserId,
}) {
  const location = useLocation();
  const cn = bem('CommentCard');

  const authorIdToUse = authorId || authorizedUserId;
  const isAuthorAuthorized = authorIdToUse === authorizedUserId;

  return (
    <div className={cn()}>
      <div className={cn('row')}>
        <SideLayout>
          <span className={cn('author', { authorized: isAuthorAuthorized })}>{author}</span>
          <span className={cn('date')}>{date}</span>
        </SideLayout>
      </div>
      <div className={cn('row')}>
        <div className={cn('text')}>{text}</div>
      </div>
      <div className={cn('row')}>
        {sessionExists ? (
          <HashLink smooth to={`${location.pathname}#${id}`}>
            <span className={cn('answer')} onClick={onAnswerClick}>
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
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  answerLabel: PropTypes.string.isRequired,
  sessionExists: PropTypes.bool.isRequired,
  loginPath: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  authorizedUserId: PropTypes.string.isRequired,
};

export default memo(CommentCard);
