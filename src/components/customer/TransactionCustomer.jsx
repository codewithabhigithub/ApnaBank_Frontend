import { MenuItem, Select, TextField } from '@material-ui/core';
import axios from 'axios';
import './TransactionCustomer.css'
import React, { useEffect, useState } from 'react'
import './TransactionReceipt.css'
import TransactionHistory from './TransactionHistory';
function TransactionCustomer() {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState();
  const [cif, setCif] = useState();
  const jwt = localStorage.getItem("jwt");
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [transfer, setTransfer] = useState(false);
  const [sameBank, setSameBank] = useState(false);
  const [otherbank, setOtherBank] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const[transactionHistory,setTransactionHistory]=useState([]);
  const [otherBankAccountNumber, setOtherBankAccountNumber] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);
  const[receiverAccountNumber,setReceiverAccountNumber]=useState('');

  const [otherBankData, setOtherBankData] = useState({ accountNumber: '', ifsc: '' });

  useEffect(() => {
    axios.get("http://localhost:8888/transaction/find/allAccounts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {

        // console.log(res.data)
        setAccounts(res.data);
        if (res.data.length > 0) {
          setCif(res.data[0].cif);
        }

      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, [transaction]);

  const handleSameBank = () => {
    setSameBank(true);
    setOtherBank(false);
    // setSameMoney(true)
  }
  const handleOtherBank = () => {
    setSameBank(false)
    setOtherBank(true)
    // setSameMoney(true)
  }
  const handleCancel = () => {
    setTransfer(false);
    setSameBank(false)
    setOtherBank(false)
    setOtherBankData({
      accountNumber: '',
      ifsc: '',
    });
    setAmount('');
  };
  const handleTransfer = () => {
    setTransfer(true);
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOtherBankData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };
  const selectedAccountData = accounts.find(
    (account) => account.accountNumber === selectedAccount
  );
  const handleSendMoney = () => {
    // console.log(jwt)
    if (amount <= 0) {
      alert("Amount should be greater than one rupee.")
      return;
    }
    if (!selectedAccount) {
      alert("Please select an account");
      return;
    }
    if (!receiverAccountNumber) {
      alert("Please enter the receiver's account number");
      return;
    }
    if(selectedAccountData.balance<amount){
      alert("Insufficient fund")
      return;
    }
    if((selectedAccountData.balance-amount)<selectedAccountData.minimumBalanceRequired){
      alert("Can not withdraw below minimun balance");
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to send ₹${amount} to account number ${receiverAccountNumber}?`);
    if (!confirmed) {
      return;
    }
    


  
    console.log(selectedAccount)
    axios.get("http://localhost:8888/transaction/transfer/same/" +amount +"/"+ selectedAccount +"/"+receiverAccountNumber, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setTransaction(res.data);
        setAmount('');
        setReceiverAccountNumber('');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); 
        }, 2000);

        // alert(`Transaction Successful:\nAmount Sent: ${res.data.amount}\nReceiver Account Number: ${res.data.receiverAccountNumber}\nAvl Balance: ${res.data.remainingBalance}`);

      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data)
      });
  }
  const handleOtherBankMoney = () => {
    console.log(jwt)
    if (amount <= 0) {
      alert("Amount should be greater than one rupee.")
      return;
    }
    if (!selectedAccount) {
      alert("Please select an account");
      return;
    }
    if (!otherBankData.accountNumber) {
      alert("Please enter the receiver's account number");
      return;
    }
    if (!otherBankData.ifsc) {
      alert("Please enter the receiver's IFSC");
      return;
    }
    if(selectedAccountData.balance<amount){
      alert("Insufficient fund")
      return;
    }
    if((selectedAccountData.balance-amount)<selectedAccountData.minimumBalanceRequired){
      alert("Can not withdraw below minimun balance");
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to send ₹${amount} to account number ${otherBankData.accountNumber}?`);
    if (!confirmed) {
      return;
    }
    

    const payload = {
      accountNumber: otherBankData.accountNumber,
      ifsc: otherBankData.ifsc
    };
    console.log(payload);
    console.log(selectedAccount)
    axios.post("http://localhost:8888/transaction/transfer/other/" +amount +"/"+ selectedAccount ,payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setTransaction(res.data);
        setAmount('');
        setOtherBankData({
          accountNumber: '',
          ifsc: '',
        });
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); 
        }, 2000);

        // alert(`Transaction Successful:\nAmount Sent: ${res.data.amount}\nReceiver Account Number: ${res.data.receiverAccountNumber}\nAvl Balance: ${res.data.remainingBalance}`);

      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data)
      });
  }

const handleTransactionHistory=()=>{
  if (!selectedAccount) {
    alert("Please select an account");
    return;
  }
  setOpenPopUp(true);
  axios.get("http://localhost:8888/transaction/self/allTransaction/"+selectedAccount , {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setTransactionHistory(res.data)
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data)
      });
}
  return (
    <>
      <div className="transaction-customer-container">
      {/* <img src="/images/tran.png" alt="...." style={{position:"absolute",right:"80px"}}/> */}

        {accounts && (
          <div className="transaction-customer-details">
            <h1 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } > Account Details</h1>
            <table className="transaction-customer-table">
              <tr>
                <td style={{ fontFamily:'LatoRegular' }} >Customer ID</td>
                <td>{cif}</td>
              </tr>


              <tr>
                <td style={{ fontFamily:'LatoRegular' }} >Account Number</td>
                <td>
                  <Select
                    value={selectedAccount}
                    onChange={handleAccountChange}
                  >
                    <MenuItem disabled value="">select </MenuItem>
                    {accounts.map((account) => (
                      <MenuItem
                        value={account.accountNumber}
                        key={account.accountNumber}>
                        {account.accountNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </td>

              </tr>
              <tr>
                <td style={{ fontFamily:'LatoRegular' }} >Type</td>
                {selectedAccountData &&
                  <td>{selectedAccountData.accountType}</td>
                }
              </tr>
              <tr>
                <td style={{ fontFamily:'LatoRegular' }} >Avl. Balance</td>
                {selectedAccountData &&
                  <td>{selectedAccountData.balance}</td>
                }
              </tr>
              <tr>
                <td style={{ fontFamily:'LatoRegular' }} >Branch</td>
                <td>Apna Branch</td>
              </tr>
              <tr>
                <td style={{ fontFamily:'LatoRegular' }}>IFSC</td>
                <td>ApnaXXX</td>
              </tr>
              <tr>
                <td style={{ fontFamily:'LatoRegular' }} >Status</td>
                {selectedAccountData && selectedAccountData.status && <td>Active</td>}
                {selectedAccountData && !selectedAccountData.status && <td>Inactive</td>}
              </tr>
            </table>
            <div className="transaction-customer-actions">
              {!transfer && (
                <button className="transaction-customer-button1" onClick={handleTransfer}
                style={{
                  fontFamily: 'LatoRegular'
                  , borderRadius: '50px',
                  backgroundColor: '#861f41',
                }}
                >
                  Transfer
                </button>
              )}
              {transfer && !sameBank && !otherbank && (
                <>
                  <button className="transaction-customer-button1" onClick={handleSameBank}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Same Bank
                  </button>
                  <button className="transaction-customer-button1" onClick={handleOtherBank}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Other Bank
                  </button>
                  <button className="transaction-customer-button-cancel" onClick={handleCancel}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Cancel
                  </button>
                </>
              )}

              {sameBank && (
                <>
                  <TextField
                    id="sameBankAccountNumber"
                    className="input-same-bank"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value) }}
                  /><br></br>
                  <TextField
                    id="accountNumber"
                    className="input-same-bank"
                    placeholder="Account Number"
                    onChange={(e) => { setReceiverAccountNumber(e.target.value) }}
                  />
                  <button className="transaction-customer-button1" onClick={handleSendMoney}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Send Money
                  </button>
                  <button className="transaction-customer-button-cancel" onClick={handleCancel}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Cancel
                  </button>
                </>
              )}
              {otherbank && (
                <>
                  <TextField
                    id="otherBankAmount"
                    className="input-other-bank"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  /><br />
                  <TextField
                    id="otherBankAccountNumber"
                    className="input-other-bank"
                    placeholder="Enter Account Number"
                    onChange={(e) => setOtherBankData({ ...otherBankData, accountNumber: e.target.value })}

                  /><br />
                  <TextField
                    id="otherBankIFSC"
                    className="input-other-bank"
                    placeholder="Enter IFSC"
                    onChange={(e) => setOtherBankData({ ...otherBankData, ifsc: e.target.value })}

                  />
                  <button className="transaction-customer-button1" onClick={handleOtherBankMoney}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Send Money
                  </button>
                  <button className="transaction-customer-button-cancel" onClick={handleCancel}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Cancel
                  </button>
                </>
              )}
              {!transfer && (
                <button className="transaction-customer-button1" onClick={()=>{
                  setTransactionHistory(transactionHistory);
                   
                    handleTransactionHistory();
                  }
                  }
                  style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                  Transaction History
                </button>
              )}
            </div>
          </div>
        )}
        {showAlert && (
          <div className="alert-transaction">
            Transaction Successful
          </div>
        )}
      </div>

      {openPopUp === true && (

<div>

    <TransactionHistory
        transactionHistory={transactionHistory}
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}

    />

</div>
)
}


    </>
  )
}

export default TransactionCustomer