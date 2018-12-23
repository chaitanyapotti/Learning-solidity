import axios from "axios";
import actionTypes from "./actionTypes";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "9930466714";

export const fetchPosts = () => dispatch => {
  axios
    .get(`${ROOT_URL}/posts`, { params: { key: API_KEY } })
    .then(response => {
      const { status, data } = response || {};
      if (status === 200) {
        dispatch({
          type: actionTypes.FETCH_POSTS,
          payload: data
        });
      }
    })
    .catch(err => console.log(err));
};

export const createPost = (props, history) => dispatch => {
  console.log(props, "logged props");
  axios
    .post(`${ROOT_URL}/posts?key=${API_KEY}`, props)
    .then(response => {
      const { status, data } = response || {};
      if (status > 200) {
        history.push("/");
        dispatch({
          type: actionTypes.CREATE_POST,
          payload: data
        });
      }
    })
    .catch(err => console.log(err));
};

export const fetchPost = id => dispatch => {
  axios
    .get(`${ROOT_URL}/posts/${id}`, { params: { key: API_KEY } })
    .then(response => {
      const { status, data } = response || {};
      if (status === 200) {
        dispatch({
          type: actionTypes.FETCH_POST,
          payload: data
        });
      }
    })
    .catch(err => console.log(err));
};

export const deletePost = (id, history) => dispatch => {
  axios
    .delete(`${ROOT_URL}/posts/${id}`, { params: { key: API_KEY } })
    .then(response => {
      const { status, data } = response || {};
      if (status === 200) {
        history.push("/");
        dispatch({
          type: actionTypes.DELETE_POST,
          payload: data
        });
      }
    })
    .catch(err => console.log(err));
};
