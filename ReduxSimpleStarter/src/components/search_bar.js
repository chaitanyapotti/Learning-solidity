import React, { Component } from "react";
//@ts-check
// const SearchBar = () => {
//     return <input />; //JSX is converted to as React.createElement().. hence need to include React import
// };

//to render jsx to js, need to import react

//to manage state in a class, we need class components and not functional components
class SearchBar extends Component {
  state = { term: "" };

  render() {
    return (
      <div className="search-bar">
        <input onChange={this.onInputChange} />
      </div>
    );
  }

  onInputChange = e => {
    this.setState({ term: e.target.value });
    this.props.onSearchTermChange(e.target.value);
  };
}

export default SearchBar;
