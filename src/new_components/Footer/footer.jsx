import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>Digital FD,Personal Loan, Car Loan,Home Loan, Savings Account,24x7 Loans, Credit Card, FD, FD Interest Rates, Education Loan, Current Account, Fastag, Trade & Forex, CMS, TATA AIG General Insurance, ICICI Lombard General Insurance, Apna Pay,Apna Mobile, Internet Banking, PPF Account, 24x7 Loan Against SecuritiesNew, Mutual Fund Management, Digital Gold, Apna Family Book of Records</p>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="footer-column">
            <h3>Social Media</h3>
            <ul className="social-media-list">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
