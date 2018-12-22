import actionTypes from "../actions/actionTypes";

export const initialState = {
  term: "",
  weatherData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TERM_CHANGED:
      return {
        ...state,
        term: action.payload
      };
    case actionTypes.FETCH_WEATHER:
      return {
        ...state,
        weatherData: [action.payload, ...state.weatherData]
      };
    default:
      return state;
  }
};
