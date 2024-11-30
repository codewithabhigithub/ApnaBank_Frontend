import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App1.css";

function Weather_main() {
  return (
    // <React.Fragment>
    <>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        {" "}
        | Developed by{" "}
          Mohit Sharma
        {" "}
        | Powered by{" "}
      </div>
      </>
    // </React.Fragment>
  );
}

export default Weather_main;
