//State argument is not app state but only the state the component is responsible for
export default function(state = null, action) {
  switch (action.type) {
    case "BOOK_SELECTED":
      return action.payload;
  }

  return state;
}
