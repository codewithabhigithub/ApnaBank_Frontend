import './CreditCard.css';
import logo from '../logo4.png'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ApplyCreditCardAction from './ApplyCreditCardAction';
import MakeCardPayment from './MakeCardPayment';
import chip from './chip.png'
import Repyament from './Repyament';
import CreditCardHistory from './CreditCardHistory';
import ChangePin from './ChangePin';
function CreditCard() {
  const [openApplyPopUp, setOpenApplyPopUp] = useState(false)
  const [openPaymentPopUp, setOpenPaymentPopUp] = useState(false)
  const [openRepaymentPopUp, setOpenRepaymentPopUp] = useState(false)
  const [openTransactionHistoryPopUp, setOpenTransactionHistoryPopUp] = useState(false);
  const [openChangePinPopUp, setOpenChangePinPopUp] = useState(false)
  const [user, setUser] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const [application, setApplication] = useState(null);
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8888/creditCard/customer/creditCardApplication", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log("APPLICATION")
        console.log(res.data);
        setApplication(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
    axios.get("http://localhost:8888/creditCard/customer/creditCard", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log("CARD")
        console.log(res.data);
        setCard(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, [openPaymentPopUp, openRepaymentPopUp]);
  const handleApply = () => {
    axios.get("http://localhost:8888/customer/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });

  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleApplyButton = () => {
    if (!isChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    } else {
      setOpenApplyPopUp(true);
    }
  };
  const handleStatus = () => {
    alert("Your application is under documentation verification state.");
  }
  const handleStatus2 = () => {
    alert("Document Verification successful final approve is pending");
  }
  const clicked = () => {
    console.log("clicked")
  }
  return (
    <>
      <div className='main-credit-card-customer' >

        {!application && (
          <>
            <div className="container-credit-card-apply" style={{ top: "50px" }}>
              <h1 style={{ fontFamily: 'LatoBold' }} >Apply for credit card </h1>
              {/* <ul>
                <li>Rule 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Rule 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Rule 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              </ul> */}
              <input type="checkbox" id="termsCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="termsCheckbox"
                style={{
                  fontFamily: 'LatoRegular',

                }} >I agree to the terms and conditions</label>
              {!application && (
                <button className="button-credit-card-apply" onClick={() => {
                  setUser(user);
                  handleApply();
                  handleApplyButton();
                }}

                  style={{
                    width: '30%',
                    fontFamily: 'LatoBold'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                    alignItems: 'center',
                    display: 'flex'

                  }}

                >Apply</button>
              )}
            </div>

          </>
        )
        }
        {application && (
          <>
            <div className="container-credit-card-customer">
              <div className="card front-face-credit-card-customer">
                <header>
                  {/* <span className="logo">
                    <img src={logo} alt="" />
                    <h4 style={{color:"black"}}>Visa Card</h4>
                  </span> */}
                  <h4 style={{ color: "black" }}>Visa Card</h4>
                  <img src={chip} alt="" className="chip-credit-card-customer" />
                </header>

                <div class="card-details-credit-card-customer">
                  <div class="name-number-credit-card-customer">
                    <h6>Card Number</h6>
                    {card && (
                      <h5 class="number-credit-card-customer">8050 2030 3020 00{card.creditCardNumber}</h5>
                    )}
                    <h5 class="name-credit-card-customer">{application.firstName} {application.lastName}</h5>
                  </div>
                  {card && (
                    <div class="valid-date-credit-card-customer">
                      <h6>Valid Thru</h6>
                      <h5>{`${card.expiryDate.slice(5, 7)}/${card.expiryDate.slice(2, 4)}`}</h5>
                    </div>
                  )
                  }
                </div>
              </div>

              <div class="card back-face-credit-card-customer">
                <h6>
                  For customer service call +971 4343 3443 or email at
                  mastercard@gmail.com
                </h6>
                <div><span class="magnetic-strip-credit-card-customer"></span></div>
                {card && (
                  <div class="signature-credit-card-customer"><i className='cvv-card'>{card.cvv}</i></div>

                )}
                {/* <h5>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
                  maiores sed doloremque nesciunt neque beatae voluptatibus doloribus.
                  Libero et quis magni magnam nihil temporibus? Facere consectetur
                  dolore reiciendis et veniam.
                </h5> */}
                <h1></h1>
                <h1></h1>
                {card && card.status && (
                  <div>
                    <h4>Limit   : {card.maximumLimit}</h4>
                    <h4>Avl Bal : {card.remainingLimit}</h4>
                    <h4>Bill  : {card.maximumLimit - card.remainingLimit}</h4>
                  </div>
                )}
                {!card && (
                  <button className='card-status-customer' onClick={handleStatus} >Track Status</button>
                )

                }

                {card && !card.status && (
                  <button onClick={handleStatus2} className='card-status-customer'>Track Status</button>
                )

                }
              </div>
            </div>
          </>
        )
        }
      </div>
      <div className="buttons-container-credit-card">

        {application && (
          <>
            <div>
              <button className="button-credit-card" style={{
                width: '90%',
                fontFamily: 'LatoBold'
                , borderRadius: '20px',
                backgroundColor: '#861f41',
                alignItems: 'center'
              }} onClick={() => {
                setOpenPaymentPopUp(true);
              }}>Payment</button>
            </div>
            <div>
              <button className="button-credit-card" style={{
                width: '90%',
                fontFamily: 'LatoBold'
                , borderRadius: '20px',
                backgroundColor: '#861f41',
                alignItems: 'center'
              }} onClick={() => {
                setOpenRepaymentPopUp(true);
              }}>Invoice Repayment</button>
            </div>
            <div>
              <button className="button-credit-card" style={{
                width: '90%',
                fontFamily: 'LatoBold'
                , borderRadius: '20px',
                backgroundColor: '#861f41',
                alignItems: 'center'
              }} onClick={() => {
                setOpenTransactionHistoryPopUp(true);
                // clicked();
              }}>Transaction History</button>
            </div>
            <div>
              <button className="button-credit-card" style={{
                width: '90%',
                fontFamily: 'LatoBold'
                , borderRadius: '20px',
                backgroundColor: '#861f41',
                alignItems: 'center'
              }} onClick={() => {
                setOpenChangePinPopUp(true);
                clicked();
              }}>Change PIN</button>
            </div>
          </>
        )}



        {/* <button className="button-credit-card">Button 5</button> */}
      </div>
      {openApplyPopUp === true && (
        <div>
          <ApplyCreditCardAction user={user} openApplyPopUp={openApplyPopUp} setOpenApplyPopUp={setOpenApplyPopUp} pin={card.pin} />

        </div>
      )}
      {openPaymentPopUp === true && (
        <div>
          <MakeCardPayment openPaymentPopUp={openPaymentPopUp} setOpenPaymentPopUp={setOpenPaymentPopUp} />

        </div>
      )}
      {openRepaymentPopUp === true && (
        <div>
          <Repyament openRepaymentPopUp={openRepaymentPopUp} setOpenRepaymentPopUp={setOpenRepaymentPopUp} pin={card.pin} />

        </div>
      )}
      {
        openTransactionHistoryPopUp === true && (
          <div>
            <CreditCardHistory
              openTransactionHistoryPopUp={openTransactionHistoryPopUp}
              setOpenTransactionHistoryPopUp={setOpenTransactionHistoryPopUp}
            />
          </div>
        )
      }
      {
        openChangePinPopUp === true && (
          <div>
            <ChangePin
              openChangePinPopUp={openChangePinPopUp}
              setOpenChangePinPopUp={setOpenChangePinPopUp}
            />
          </div>
        )
      }
    </>
  )
}

export default CreditCard;