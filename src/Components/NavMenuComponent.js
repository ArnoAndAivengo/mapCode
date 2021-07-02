import React, { Component, Fragment } from "react";
import moment from "moment";
import { FixedSizeList } from "react-window";
import ShopInfoComponent from "../Components/ShopInfoComponent";
import AutoSizer from "react-virtualized-auto-sizer";
import "../Scss/NavMenuComponent.scss";
class NavMenuComponent extends Component {
  componentDidMount = () => {
    moment.locale();
  };
  renderCardInfo = () => {
    const { data, handleCardClick } = this.props;
    let row = ({ index, style }) => {
      return (
        <div
          id={data[index].title}
          style={{ ...style, backgroundColor: "#fff" }}
        >
          <ShopInfoComponent
            shopItem={data[index]}
            handleCardClick={handleCardClick}
          />
        </div>
      );
    };
    // return data.map(item => {
    //   return (
    //     <div
    //       key={item.properties.id}
    //       className="navMenuComponent-shopListContainer-cardContent"
    //     >
    //       <ShopInfoComponent
    //         shopItem={item}
    //         handleCardClick={handleCardClick}
    //       />
    //     </div>
    //   );
    // });
    return (
      <AutoSizer style={{ width: "100%" }}>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={150}
          >
            {row}
          </FixedSizeList>
        )}
      </AutoSizer>
    );
  };
  render() {
    const { handleSearchBarSubmit } = this.props;
    return (
      <Fragment>
        <div className="navMenuComponent-titleContainer">
          <div className="navMenuComponent-titleContainer-content">
            <p className="navMenuComponent-titleContainer-title">口罩查詢</p>
            <div className="navMenuComponent-titleContainer-dateContent">
              <p>{moment().format("dddd")}</p>
              <p>{moment().format("YYYY/MM/DD")}</p>
            </div>
          </div>
          <div className="navMenuComponent-titleContainer-searchBar">
            <input
              placeholder="搜尋區域,地址,藥局"
              type="text"
              onKeyPress={handleSearchBarSubmit}
            />
          </div>
        </div>
        <div className="navMenuComponent-shopListContainer">
          {this.renderCardInfo()}
        </div>
      </Fragment>
    );
  }
}
export default NavMenuComponent;
