import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import store from "./store";
import routes from "./routes";
import App from "./components/app";

//http://www.blog.com/posts/5

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>{routes}</App>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
