import React, { Component } from "react";
import "../Scss/ShopInfoComponent.scss";
class ShopInfoComponent extends Component {
  render() {
    const { shopItem, handleCardClick } = this.props;
    const {
      name,
      phone,
      address,
      mask_adult,
      mask_child
    } = shopItem.properties;
    const [lat, lon] = shopItem.geometry.coordinates;
    return (
      <div
        className="shopInfoComponent-container"
        onClick={() => (handleCardClick ? handleCardClick(lat, lon) : null)}
      >
        <p className="shopInfoComponent-container-title">{name}</p>
        <p className="shopInfoComponent-container-font">{phone}</p>
        <p className="shopInfoComponent-container-font">{address}</p>
        <div className="shopInfoComponent-container-rowBox">
          <p
            className={`shopInfoComponent-container-rowBox-column ${
              mask_adult ? "blue" : "gray"
            }`}
          >
            <span>成人口罩</span>
            <span>{mask_adult}</span>
          </p>
          <p
            className={`shopInfoComponent-container-rowBox-column ${
              mask_child ? "red" : "gray"
            }`}
          >
            <span>兒童口罩</span>
            <span>{mask_child}</span>
          </p>
        </div>
      </div>
    );
  }
}
export default ShopInfoComponent;
