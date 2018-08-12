import _ from "lodash";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ytsearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
//Create a new component. This component should produce some HTML

const API_KEY = "AIzaSyAkO25-NQ3t-5Zm_ANvUtO3L7FY_t4LeY0";

//npm install --save lodash

//React is used to create and manage components
//React DOM is used to interact with DOM

//React turns JSX to html
//The top level component should be responsible for fetching the data
class App extends Component {
    
    constructor (props) {
        super(props);

        this.state = { 
            videos:[],
            selectedVideo: null
        };

        this.videoSearch("surfboards")
    }

    videoSearch(term) {
        ytsearch({key: API_KEY, term: term}, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    }

    render (){
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
        return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos}/>
        </div>);
    }
}

//take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));