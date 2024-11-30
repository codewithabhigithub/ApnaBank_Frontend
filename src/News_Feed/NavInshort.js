import React from "react";
import "./NavInshort.css";
import HamburgerDrawer from "../HamburgerDrawer";

const NavInshort = ({ setCategory }) => {
  return (
    <div className="nav">
      <div className="menu">
        <HamburgerDrawer setCategory={setCategory} className="data" />
      </div>


          {/* <h1> News Feed </h1> */}
     {/*    <img
        style={{ cursor: "pointer" }}
        // src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png"
        height="80%"
        alt="logo"
      /> */}
    </div>
  );
};

export default NavInshort;
