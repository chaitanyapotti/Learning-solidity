import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions";
import { Link } from "react-router-dom";

class PostsShow extends Component {
  componentDidMount() {
    const { fetchPost: getPost, match } = this.props || {};
    getPost(match.params.id);
  }

  onDelete = () => {
    const { deletePost: deletingPost, match, history } = this.props || {};
    deletingPost(match.params.id, history);
  };

  render() {
    const { post } = this.props || {};
    if (!post) return <div>Loading...</div>;
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDelete}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { PostsReducer } = state;
  const { post } = PostsReducer;
  return { post };
};

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostsShow);
