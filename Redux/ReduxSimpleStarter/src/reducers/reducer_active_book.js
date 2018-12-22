//State argument is not app state but only the state the reducer is responsible for
export default (state = null, action) => {
  switch (action.type) {
    case "BOOK_SELECTED":
      return action.payload;
    default:
      return state;
  }
};
