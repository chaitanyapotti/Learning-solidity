import React from "react";
import { Switch, Route } from "react-router-dom";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/posts_show";

export default (
  <Switch>
    <Route exact path="/" component={PostsIndex} />
    <Route exact path="/posts/new" component={PostsNew} />
    <Route strict path="/posts/:id" component={PostsShow} />
  </Switch>
);
