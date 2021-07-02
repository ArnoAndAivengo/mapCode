import React, { Component, Suspense } from "react";
import { Map, TileLayer } from "react-leaflet";
// import MarkerComponent from "../Components/MarkerComponent";
import NavMenuComponent from "../Components/NavMenuComponent";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "../Scss/MapContainer.scss";
const MarkerComponent = React.lazy(() =>
  import("../Components/MarkerComponent")
);
class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      apiData: [],
      data: [],
      viewport: {
        center: [25.04836, 121.56066],
        zoom: 10
      },
      keyword: ""
    };
  }

  componentDidMount = () => {
    this.fetchAPI();
  };

  fetchAPI = async () => {
    let data = await (await fetch(
      "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
    )).json();
    this.setState({
      apiData: data.features,
      data: data.features
    });
  };
  handleMapAttrChange = (attr, value) => {
    this.setState({
      [attr]: value
    });
  };
  handleViewportChanged = viewport => {
    const { apiData } = this.state;
    let [lan, lat] = viewport.center;
    let filterData = apiData.filter(item => {
      let itemLan = parseFloat(item.geometry.coordinates[1]);
      let itemLat = parseFloat(item.geometry.coordinates[0]);
      return (
        itemLan <= lan + 0.05 &&
        itemLan >= lan - 0.05 &&
        itemLat <= lat + 0.05 &&
        itemLat >= lat - 0.05
      );
    });
    this.setState({
      viewport: {
        center: [viewport.center[0], viewport.center[1]],
        zoom: viewport.zoom
      },
      data: filterData
    });
  };

  handleSearchBarSubmit = e => {
    e.persist(); // 保留住 Event 事件
    if (e.key !== "Enter") return; // onKeyPress 事件
    const { apiData } = this.state;
    let keyword = e.target.value;
    let filterData = apiData.filter(item => {
      const { name, address } = item.properties;
      let dataString = name + address;
      return dataString.indexOf(e.target.value) !== -1;
    });
    this.handleMapAttrChange("data", keyword ? filterData : apiData);
  };
  handleCardClick = (lat, lon) => {
    this.setState({
      viewport: {
        center: [lon, lat],
        zoom: 18
      }
    });
  };

  render() {
    const { viewport, data, apiData } = this.state;
    return (
      <div className="mapContainer-container">
        <div className="mapContainer-container-controllContent">
          <NavMenuComponent
            data={data}
            viewport={viewport}
            handleCardClick={this.handleCardClick}
            handleSearchBarSubmit={this.handleSearchBarSubmit}
          />
        </div>
        <div className="mapContainer-container-mapContent">
          <Map
            useFlyTo={true}
            className="mapContainer-container-mapContent-map"
            center={viewport.center}
            zoom={viewport.zoom}
            minZoom={3}
            maxZoom={25}
            animate={true}
            onViewportChanged={this.handleViewportChanged}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup showCoverageOnHover={true}>
              <Suspense
                fallback={
                  <div className="mapContainer-container-loading">
                    Loading...
                  </div>
                }
              >
                <MarkerComponent data={apiData} />
              </Suspense>
            </MarkerClusterGroup>
          </Map>
        </div>
      </div>
    );
  }
}
export default MapContainer;
