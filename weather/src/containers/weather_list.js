import React, { Component } from "react";
import { connect } from "react-redux";
import ChartComponent from "../components/chartComponent";
import GoogleMap from "../components/google_map";

class WeatherList extends Component {
  renderWeather = cityData => {
    const { name, coord } = cityData.city;
    const pressure = cityData.list.map(x => x.main.pressure);
    const humidity = cityData.list.map(x => x.main.humidity);
    const temp = cityData.list.map(x => x.main.temp);
    const { lon, lat } = coord;
    return (
      <tr key={name}>
        <td>
          <GoogleMap lat={lat} lon={lon} />
        </td>
        <td>
          <ChartComponent data={temp} color="orange" units="K" />
        </td>
        <td>
          <ChartComponent data={pressure} color="red" units="hPa" />
        </td>
        <td>
          <ChartComponent data={humidity} color="blue" units="%" />
        </td>
      </tr>
    );
  };

  render() {
    const { weatherData } = this.props || {};
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{weatherData.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  const { searchBarData } = state || {};
  const { weatherData } = searchBarData || {};
  return { weatherData };
};

export default connect(mapStateToProps)(WeatherList);
