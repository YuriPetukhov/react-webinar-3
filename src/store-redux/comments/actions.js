export default {
  /**
   * Загрузка комментариев по id товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({
          type: 'comments/load-success',
          payload: { data: res.data.result },
        });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Выбор комментария для ответного комментария
   * @param id
   */
  setActive: id => {
    return { type: 'comments/set-active', payload: { id } };
  },

  /**
   * Добавление комментария
   * @param username
   * @param commentText
   * @param id
   * @param type
   * @param authorId
   */
  addComment: (username, commentText, id, type, authorId) => {
    return async (dispatch, getState, services) => {
      // Проверка на пустой комментарий (включая пробелы)
      if (!commentText.trim()) {
        return; // Не отправляем пустой комментарий
      }

      dispatch({ type: 'comments/adding-comment-start' });

      const token = localStorage.getItem('token');

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: { [services.config.store.modules.session.tokenHeader]: token },
          body: JSON.stringify({
            text: commentText.trim(), // Убираем пробелы
            parent: { _id: id, _type: type },
            authorId: authorId,
          }),
        });

        const {
          _id,
          text,
          dateCreate,
          isDeleted,
          parent: { _id: parentId, _type: parentType },
        } = res.data.result;

        const data = {
          _id,
          text,
          dateCreate,
          isDeleted,
          author: {
            profile: { name: username },
            id: authorId,
          },
          parent: { _id: parentId, _type: parentType },
        };

        // Добавление комментария в список
        dispatch({
          type: 'comments/adding-comment-success',
          payload: { data },
        });

        dispatch({
          type: 'comments/add-comment-to-list',
          payload: { comment: data },
        });
      } catch (e) {
        dispatch({ type: 'comments/adding-comment-error' });
      }
    };
  },
};
