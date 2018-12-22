import axios from "axios";
import actionTypes from "./actionTypes";

const API_KEY = "efcdfdb9d8cd6d4413d90e78b81525f6"; //
const QUERY_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const onTermChange = term => dispatch =>
  dispatch({
    type: actionTypes.TERM_CHANGED,
    payload: term
  });

//Middleware lets action pass, manipulates it, logs it or stops it
export const fetchWeather = city => dispatch => {
  const url = `${QUERY_URL}&q=${city},us`;
  axios
    .get(url)
    .then(response => {
      const { status, data } = response || {};
      if (status === 200) {
        dispatch({
          type: actionTypes.FETCH_WEATHER,
          payload: data
        });
      }
    })
    .catch(err => console.log(err));
};
