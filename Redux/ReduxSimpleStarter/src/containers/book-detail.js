import React, { Component } from "react";
import { connect } from "react-redux";

class BookDetails extends Component {
  render() {
    console.log("re-render", "activebook Detail");
    if (!this.props.book) {
      return <div>Select a book to get started.</div>;
    }
    return (
      <div>
        <h3>Details for:</h3>
        <div> Title : {this.props.book.title}</div>
        <div> Pages : {this.props.book.pages}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("re-render", "activebook");
  return {
    book: state.activeBook
  };
};

export default connect(mapStateToProps)(BookDetails);
