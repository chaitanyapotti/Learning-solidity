import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBook } from "../actions/index";
import { bindActionCreators } from "redux";

//A container is a react component that has a direct connection with the state in redux

//we create containers from components that care about state

class BookList extends Component {
  render() {
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }

  renderList() {
    return this.props.books.map(item => {
      return (
        <li
          onClick={() => this.props.selectBook(item)}
          className="list-group-item"
          key={item.title}
        >
          {item.title}
        </li>
      );
    });
  }
}

function mapStateToProps(state) {
  //whatever is returned from here will show up as props in booklist
  return { books: state.books };
}

//Anything returned from this function will endup as props in booklist
function mapDispatchToProps(dispatch) {
  //whenever selectbook is called, the result should be passed to all the reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

//promote booklist from a component to a container
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
//connect takes a map function and component to produce a container
