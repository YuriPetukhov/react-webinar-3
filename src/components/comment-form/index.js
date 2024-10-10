import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import SideLayout from '../side-layout';
import './style.css';

function CommentForm({
  t,
  sessionExists,
  loginPath,
  type,
  cancelHandler,
  submitHandler,
  id = 'new-comment',
}) {
  const [text, setText] = useState('');
  const cn = bem('CommentForm');

  if (!sessionExists)
    return (
      <div className={cn()}>
        <div className={cn('denied')}>
          <Link to={loginPath} className={cn('link')}>
            {t('comments.logIn')}
          </Link>
          {t('comments.hasAccess')}
        </div>
      </div>
    );

  return (
    <div className={cn()}>
      <form
        onSubmit={e => {
          e.preventDefault();
          submitHandler?.(text, id);
        }}
      >
        <div className={cn('row')} id={id}>
          <label className={cn('label')}>
            {type === 'answer' ? t('comments.newAnswer') : t('comments.newComment')}
          </label>
        </div>
        <div className={cn('row')}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className={cn('textarea')}
            rows={5}
          ></textarea>
        </div>
        <SideLayout>
          <button type="submit">{t('comments.send')}</button>
          <>
            {type === 'answer' && <button onClick={cancelHandler}>{t('comments.cancel')}</button>}
          </>
        </SideLayout>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  t: PropTypes.func,
  sessionExists: PropTypes.bool,
  loginPath: PropTypes.string,
  type: PropTypes.string,
  cancelHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  id: PropTypes.string,
};

export default memo(CommentForm);