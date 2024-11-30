import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './TransactionReceipt.css'; // Import the CSS file for styling
import axios from 'axios';

function CreditCardHistory(props) {
  const { openTransactionHistoryPopUp, setOpenTransactionHistoryPopUp } = props;
  const[transactionHistory,setTransactionHistory]=useState([]);
  const jwt = localStorage.getItem("jwt");

  useEffect(()=>{
    console.log("in history")
    axios.get("http://localhost:8888/creditCard/customer/allTransaction", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setTransactionHistory(res.data);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          // Handle error
        });
    }, []);

  return (
    <>
      {transactionHistory && (
        <Dialog open={openTransactionHistoryPopUp} maxWidth="lg">
          <DialogTitle>Transaction History</DialogTitle>
          <DialogContent>
            <TableContainer className="transaction-history-table-container">
              <Table>
                <TableHead >
                  <TableRow className='transaction-history-table-head'>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date </TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Receiver Details</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.creditCardTransactionId} className="transaction-row">
                     
                      <TableCell>{transaction.creditCardTransactionId}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleString('en-GB', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.receiverDetails}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.remainingLimit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTransactionHistoryPopUp(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default CreditCardHistory;
