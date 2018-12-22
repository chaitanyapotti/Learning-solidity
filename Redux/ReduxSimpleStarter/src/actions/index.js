export const selectBook = book => {
  return {
    //select book is an action creator, it needs to return an action property
    type: "BOOK_SELECTED",
    payload: book
  };
};
