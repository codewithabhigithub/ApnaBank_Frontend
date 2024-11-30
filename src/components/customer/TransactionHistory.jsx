import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import './TransactionReceipt.css'; // Import the CSS file for styling

function TransactionHistory(props) {
  const { openPopUp, setOpenPopUp, transactionHistory } = props;

  return (
    <>
      {transactionHistory && (
        <Dialog open={openPopUp} maxWidth="lg">
          <DialogTitle>Transaction History</DialogTitle>
          <DialogContent>
            <TableContainer className="transaction-history-table-container">
              <Table>
                <TableHead >
                  <TableRow className='transaction-history-table-head'>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Receiver Account Number</TableCell>
                    <TableCell>Receiver Bank Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Transaction Type</TableCell>
                    <TableCell>Date of Transaction</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.transactionId} className="transaction-row">
                      <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>{transaction.receiverAccountNumber}</TableCell>
                      <TableCell>{transaction.receiverBankName}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.transactionType}</TableCell>
                      <TableCell>{transaction.dateOfTransaction}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.remainingBalance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPopUp(false)} style={{
              fontFamily: 'LatoRegular'
              , borderRadius: '50px',
              backgroundColor: '#861f41',
            }}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default TransactionHistory;
