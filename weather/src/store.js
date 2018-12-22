import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(combineReducers(reducers), applyMiddleware(ReduxThunk));

export default store;
