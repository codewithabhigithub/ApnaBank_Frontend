import React from "react";
import "./Cart.css";
import bank from '../Images/Bank_card.png'
import loan from '../Images/Loan.png'
import credit from '../Images/CreditCard2.png'
import locker from '../Images/Locker3.jpeg'
import gift from '../Images/Gift Cards.png'
import support from '../Images/Support.jpeg'
import { Link } from 'react-router-dom';


const Cart = () => {
  return (
    <div>
      <div className="main">
        <div className="cart">
          <img src={bank} alt="Cart" className="cart-image" />
          <button className="checkout-button">Account Information</button>
        </div>
        <div className="cart">
          <img src={loan} alt="Cart" className="cart-image" />
          <button className="checkout-button"><Link to="LoanStatic" style={{ textDecoration: 'none', color: 'white' }}>Loan Information</Link></button>
        </div>
        <div className="cart">
          <img src={credit} alt="Cart" className="cart-image" />
          <button className="checkout-button"><Link to="creditCard" style={{ textDecoration: 'none', color: 'white' }}>Credit Card</Link></button>
        </div>
      </div>
      
      <div className="main">
        <div className="cart">
          <img src={locker} alt="Cart" className="cart-image" />
          <button className="checkout-button">Locker</button>
        </div>
        <div className="cart">
          <img src={gift} alt="Cart" className="cart-image" />
          <button className="checkout-button">Gift Card</button>
        </div>
        <div className="cart">
          <img src={support} alt="Cart" className="cart-image" />
          <button className="checkout-button">Support Services</button>
        </div>
      </div>
      
    </div>
  );
};

export default Cart;
