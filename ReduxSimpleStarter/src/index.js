import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from "./components/search_bar";
//Create a new component. This component should produce some HTML

const API_KEY = "AIzaSyAkO25-NQ3t-5Zm_ANvUtO3L7FY_t4LeY0";

//React is used to create and manage components
//React DOM is used to interact with DOM

//React turns JSX to html
const App = () => {
    return (
    <div>
        <SearchBar />
    </div>);
}

//take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));