import React from 'react';
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
//import "../Styles/Whatsapp.css";

function Whatsapp() {
  return (
    <div className="whatsapp-container">
        <WhatsAppWidget phoneNumber="7060581706" message="Hello, I have a query." />
      </div>
  )
}

export default Whatsapp;