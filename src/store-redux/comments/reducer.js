export const initialState = {
  data: { items: [] },
  waiting: false,
  activeComment: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: { items: [] }, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: { items: [] }, waiting: false };

    case 'comments/set-active':
      return { ...state, activeComment: action.payload.id };

    case 'comments/adding-comment-start':
      return { ...state, waiting: true };

    case 'comments/adding-comment-success':
      return {
        ...state,
        data: { ...state.data, items: [...state.data.items, action.payload.data] },
        waiting: false,
      };

    case 'comments/adding-comment-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;