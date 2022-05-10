import { post_types } from '../types';

const init_state = {
  postList: [],
};

export const post_reducer = (state = init_state, action) => {
  if (action.type === post_types.FETCH_POST) {
    return {
      ...state,
      // postList: action.payload,
      postList: action.payload,
    };
  } else if (action.type === post_types.UPDATE_POST) {
    return {
      ...state,
      postList: [...state.postList, ...action.payload],
    };
  } else if (action.type === post_types.NEW_POST) {
    return {
      ...state,
      postList: [...action.payload, ...state.postList],
      // postList: state.postList.push(...action.payload),
    };
  } else if (action.type === post_types.DELETE_POST) {
    const deletedItemArray = [...state.postList];
    deletedItemArray.splice(action.payload, 1);

    return {
      ...state,
      postList: deletedItemArray,
    };
  } else if (action.type === post_types.EDIT_POST) {
    const dataToUpdate = { ...state.postList[action.payload[0]], ...action.payload[1] };
    console.log(dataToUpdate);

    const newData = [...state.postList];
    newData.splice(action.payload[0], 1, dataToUpdate);
    return {
      ...state,
      postList: newData,
    };
  }
  // else if (action.type === post_types.LIKE_POST) {
  //   console.log(action.payload.index);
  //   console.log(action.payload);
  //   const dataIndex = state.postList[action.payload[0]];

  //   const updateData = { ...dataIndex, ...action.payload[1] };
  //   console.log(updateData);

  //   const updateArray = [...state.postList];
  //   updateArray.splice(action.payload.index, 1, updateData);

  //   return {
  //     ...state,
  //     postList: updateArray,
  //   };
  // }
  return state;
};
