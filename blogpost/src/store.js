import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./reducers";

const store = createStore(combineReducers(reducers), applyMiddleware(ReduxThunk));

export default store;
