import actionTypes from "../actions/actionTypes";

export const initialState = { all: [], post: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS: {
      return {
        ...state,
        all: action.payload
      };
    }
    case actionTypes.FETCH_POST: {
      return {
        ...state,
        post: action.payload
      };
    }
    default:
      return state;
  }
};
