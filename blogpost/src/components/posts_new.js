import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { createPost } from "../actions";
import { connect } from "react-redux";

class PostsNew extends Component {
  onSubmit = props => {
    const { createPost: makePost, history } = this.props || {};
    makePost(props, history);
  };

  render() {
    const { handleSubmit } = this.props || {};
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create A New Post</h3>
        <div className="form-group">
          <Field name="title" component={renderField} type="text" className="form-control" label="Title" />
        </div>
        <div className="form-group">
          <Field name="categories" component={renderField} type="text" className="form-control" label="Categories" />
        </div>
        <div className="form-group">
          <Field name="content" component={renderField} type="textarea" className="form-control" label="Content" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

const renderField = ({ input, label, className, type, meta: { touched, error, warning, invalid } }) => (
  <div className={`${touched && invalid ? "has-danger" : ""}`}>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className} />
      {touched && ((error && <span className="text-help">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter a category";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  return errors;
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

const connectedReduxForm = reduxForm({
  form: "PostsNewForm",
  validate
})(PostsNew);
export default connect(
  null,
  { createPost }
)(connectedReduxForm);
