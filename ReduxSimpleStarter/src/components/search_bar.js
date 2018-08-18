import React, { Component } from "react";

// const SearchBar = () => {
//     return <input />; //JSX is converted to as React.createElement().. hence need to include React import
// };

//to render jsx to js, need to import react

//to manage state in a class, we need class components and not functional components
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  render() {
    return (
      <div className="search-bar">
        <input onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term: term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
