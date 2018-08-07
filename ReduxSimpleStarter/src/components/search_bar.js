import React, {Component} from "react";

// const SearchBar = () => {
//     return <input />; //JSX is converted to as React.createElement().. hence need to include React import
// };

//to render jsx to js, need to import react

//to manage state in a class, we need class components and not functional components
class SearchBar extends Component {
    render() {
        return <input />;
    }
}

export default SearchBar;