import React, { Component } from "react";
import ReactDOM from "react-dom";
import MapContainer from "./Containers/MapContainer";
import "./styles.scss";

class App extends Component {
  render() {
    return <MapContainer />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
