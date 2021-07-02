import React, { Component, Fragment } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ShopInfoComponent from "../Components/ShopInfoComponent";
const haveMarker = L.icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const noMarker = L.icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const adultMarker = L.icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const childMarker = L.icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
class MarkerComponent extends Component {
  shouldComponentUpdate = (nextProps, nexState) => {
    if (nextProps.data === this.props.data) return false;
    return true;
  };
  getMarkerIcon = (adultMaskCount, childMaskCount) => {
    if (adultMaskCount && childMaskCount) return haveMarker;
    if (!adultMaskCount && !childMaskCount) return noMarker;
    if (adultMaskCount) return adultMarker;
    if (childMaskCount) return childMarker;
  };
  renderMarkers = () => {
    const { data } = this.props;
    if (!data) return;
    return data.map(item => {
      const { mask_adult, mask_child } = item.properties;
      return (
        <Marker
          key={item.properties.id}
          position={[
            item.geometry.coordinates[1],
            item.geometry.coordinates[0]
          ]}
          icon={this.getMarkerIcon(mask_adult, mask_child)}
        >
          <Popup closeButton={false} closeOnClick={true} minWidth={200}>
            <ShopInfoComponent shopItem={item} />
          </Popup>
        </Marker>
      );
    });
  };
  render() {
    return <Fragment>{this.renderMarkers()}</Fragment>;
  }
}
export default MarkerComponent;
