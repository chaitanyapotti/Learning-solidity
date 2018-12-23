import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

class PostsIndex extends Component {
  componentDidMount() {
    const { fetchPosts: getPosts } = this.props || {};
    getPosts();
  }

  renderPost = () => {
    return this.props.all.map(item => {
      return (
        <li className="list-group-item" key={item.id}>
          <Link to={"/posts/" + item.id}>
            <span className="pull-xs-right">{item.categories}</span>
            <strong>{item.title}</strong>
          </Link>
        </li>
      );
    });
  };

  //   onNewPostClick = e => {
  //     const { history } = this.props || {};
  //     history.push("/posts/new");
  //   };

  render() {
    const { all } = this.props || {};
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPost()}</ul>

        {/* <button onClick={this.onNewPostClick} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { PostsReducer } = state;
  const { all } = PostsReducer;
  return { all };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsIndex);
