import { TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import './Transaction.css';

function Transaction() {
  const [account, setAccount] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [withdrawlClick, setWithdrawlClick] = useState();
  const [depositClick, setDepositClick] = useState();
  const [amount, setAmount] = useState();

  const jwt = localStorage.getItem("jwt");
  const handleSubmit = () => {
    if (accountNumber === null) {
      alert("Enter the Account Number");
    }
    axios
      .get("http://localhost:8888/transactionByEmployee/find/" + accountNumber, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        console.log('User data fetched successfully');
        setAccount(res.data);

      })
      .catch((err) => {
        console.log(err);
        alert("NOT FOUND");
        if (err.status == 404) {
          alert("Account Not Found")
        }

      });
  };
  const ClearFields = () => {

    document.getElementById("accountNumber").value = "";
    document.getElementById("withdrawlAmount").value = "";
    document.getElementById("depositAmount").value = "";
  }
  const axiosWithdrawl = () => {
    axios
      .get("http://localhost:8888/transactionByEmployee/withdrawl/" + accountNumber + "/" + amount, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Withdrawl Successfull")
        handleCancel()
        handleSubmit()
        ClearFields()
      })
      .catch((err) => {
        console.log(err);
        // alert("NOT FOUND");
      });
  }
  const axiosDeposit = () => {
    axios
      .get("http://localhost:8888/transactionByEmployee/deposit/" + accountNumber + "/" + amount, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Deposit Successfull")
        handleCancel()
        handleSubmit()
        ClearFields()
      })
      .catch((err) => {
        console.log(err);
        // alert("NOT FOUND");
      });
  }

  const handleWithdrawl = () => {
    if (amount < 1) {
      alert("Amount should be greater than one");
    } else if ((account.balance - amount) <= account.minimumbalanceRequired) {
      alert("Insufficient Fund ... Maintain minimum balance")
    } else {
      axiosWithdrawl();

    }

  }
  const handleDeposit = () => {
    if (amount < 1) {
      alert("Amount should be greater than one");
    } else {
      axiosDeposit();

    }
  }
  const handleWithdrawlClick = () => {
    setWithdrawlClick(true);
    setDepositClick(false);
  };

  const handleDepositClick = () => {
    setDepositClick(true);
    setWithdrawlClick(false);
  };

  const handleCancel = () => {
    setDepositClick(false);
    setWithdrawlClick(false);
  };

  return (
    <>
      <div className="transaction-container">
        <div className="transaction-input">
          <TextField
            id='accountNumber'
            type="text"
            placeholder="Account Number"
            onChange={(e) => {
              setAccountNumber(e.target.value);
            }}
          />
          <button className="transaction-button" style={{
            fontFamily: 'LatoRegular'
            , borderRadius: '50px',
            backgroundColor: '#861f41'
          }} onClick={handleSubmit}>
            Search
          </button>
        </div>
        {account && (
          <div className="transaction-details">
            <h1 style={{ fontFamily: 'LatoBold', fontWeight: 'bold' }}> Account Details</h1>
            <table className="transaction-table">
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>Customer ID</td>
                <td>{account.cif}</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>Account Number</td>
                <td>{account.accountNumber}</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>Type</td>
                <td>{account.accountType}</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>Avl Balance</td>
                <td>{account.balance}</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>Branch</td>
                <td>{account.branchName}</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>IFSC</td>
                <td>{account.ifscCode}</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'LatoRegular' }}>Status</td>
                {account.status && <td>Active</td>}
                {!account.status && <td>Inactive</td>}
              </tr>
            </table>
            <div className="transaction-actions">
              {!withdrawlClick && !depositClick && (
                <button className="transaction-button1" style={{
                  fontFamily: 'LatoRegular'
                  , borderRadius: '50px',
                  backgroundColor: '#861f41'
                }} onClick={handleWithdrawlClick}>
                  Withdrawl
                </button>
              )}
              {withdrawlClick && (
                <>
                  <TextField
                    id='withdrawlAmount'
                    placeholder="Withdraw Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button className="transaction-button1" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41'
                  }} onClick={handleWithdrawl}>Withdrawl</button>
                  <button className="transaction-button-cancel" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41'
                  }} onClick={handleCancel}>Cancel</button>
                </>
              )}
              {!depositClick && !withdrawlClick && (
                <button className="transaction-button1" onClick={handleDepositClick}>
                  Deposit
                </button>
              )}
              {depositClick && (
                <>
                  <TextField
                    id='depositAmount'
                    className="input-deposit"
                    placeholder="Deposit Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button className="transaction-button1" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41'
                  }} onClick={handleDeposit}>Deposit</button>
                  <button className="transaction-button-cancel" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41'
                  }} onClick={handleCancel}>Cancel</button>
                </>
              )}
            </div>
          </div>
        )}

      </div>

    </>
  );
}

export default Transaction;
