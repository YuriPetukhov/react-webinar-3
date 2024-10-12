import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentCard from '../comment-card';
import CommentForm from '../comment-form';
import './style.css';

function Comments(props) {
  const {
    list,
    level = 0,
    t = text => text,
    formatDate,
    sessionExists,
    loginPath,
    activeComment,
    setActiveComment,
    submitHandler,
    authorizedUsername,
    authorizedUserId,
  } = props;

  const cn = bem('Comments');

  return (
    <>
      {list.map(comment => (
        <div key={comment._id} className={cn(!level && 'firstLevel')} style={{ marginLeft: level >= 4 ? '0px' : `${level * 20}px` }}>
          <CommentCard
            t={t}
            id={comment._id}
            author={comment.author.profile.name}
            authorId={comment.author._id}
            date={formatDate(comment.dateCreate)}
            text={comment.text}
            answerLabel={t('comments.answer')}
            onAnswerClick={() => setActiveComment(comment._id)}
            sessionExists={sessionExists}
            loginPath={loginPath}
            authorizedUsername={authorizedUsername}
            authorizedUserId={authorizedUserId}
          />
          {!!comment.children.length && (
            <Comments {...props} list={comment.children} level={level + 1} />
          )}
          {activeComment === comment._id && (
            <CommentForm
              t={t}
              sessionExists={sessionExists}
              loginPath={loginPath}
              type="answer"
              cancelHandler={() => setActiveComment(null)}
              submitHandler={(text) => submitHandler(text, comment._id)}
              id={`form-${comment._id}`}
            />
          )}
        </div>
      ))}
      {level === 0 && activeComment === 'new' && (
        <CommentForm
          t={t}
          sessionExists={sessionExists}
          loginPath={loginPath}
          type="comment"
          cancelHandler={() => setActiveComment(null)}
          submitHandler={(text) => submitHandler(text, null)}
          id="new-comment-form"
        />
      )}
    </>
  );
}

Comments.propTypes = {
  list: PropTypes.array.isRequired,
  level: PropTypes.number,
  t: PropTypes.func,
  formatDate: PropTypes.func,
  sessionExists: PropTypes.bool,
  loginPath: PropTypes.string,
  activeComment: PropTypes.string,
  setActiveComment: PropTypes.func,
  submitHandler: PropTypes.func,
  authorizedUsername: PropTypes.string,
  authorizedUserId: PropTypes.string,
};

export default memo(Comments);
