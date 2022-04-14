import { post_types } from '../types';

const init_state = {
  postList: [],
};

export const post_reducer = (state = init_state, action) => {
  if (action.type === post_types.FETCH_POST) {
    return {
      ...state,
      postList: action.payload,
    };
  }
  return state;
};
