import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onTermChange, fetchWeather } from "../actions";

class SearchBar extends Component {
  onInputChange = e => {
    const { onTermChange: onTermChangeHandler } = this.props || {};
    onTermChangeHandler(e.target.value);
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { fetchWeather: getWeather, term, onTermChange: onTermChangeHandler } = this.props || {};
    getWeather(term);
    onTermChangeHandler("");
    // we need to go and fetch weather data
  };

  render() {
    const { term } = this.props || {};
    return (
      <form className="input-group" onSubmit={this.onFormSubmit}>
        <input placeholder="Get a five-day forecast in your favorite cities" className="form-control" value={term} onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            submit
          </button>
        </span>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { searchBarData } = state || {};
  const { term } = searchBarData || {};
  return {
    term
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchWeather, onTermChange }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
