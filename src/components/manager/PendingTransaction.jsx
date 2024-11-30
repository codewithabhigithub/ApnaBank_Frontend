import React, { useEffect, useState } from 'react'
import './PendingCustomer.css'
import PopUp from './PopUp'
import { Dialog, DialogTitle } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { DialogContent, makeStyles } from '@material-ui/core';
import Profile from '../admin/ProfileAdmin'
import TransactionAction from './TransactionAction';



const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: '900px', // Adjust the width as needed
    height: '500px',
  },
}));
// import PopUp from './PopUp'
function PendingTransaction() {
  const classes = useStyles();
  const [openPopUp, setOpenPopUp] = useState(false)




  const [transaction, setTransaction] = useState();
  const [trans,setTrans]=useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios
      .get("http://localhost:8888/transactionByManager/pending", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('User data fetched successfully');

          setTrans(res.data);
          console.log(transaction)
        } else {
          console.log('Failed to fetch user data');
        }

      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="all-worker-container">
        <h1 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Pending Transactions</h1>
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Sender Account</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Reciever Account </TableCell>
                  <TableCell>Reciever's Bank</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {trans
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <TableRow key={transaction.transactionId}>
                        <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>{transaction.senderAccountNumber}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.receiverAccountNumber}</TableCell>
                      <TableCell>{transaction.receiverBankName}</TableCell>
                      <TableCell>{transaction.dateOfTransaction}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      


                      <TableCell><button onClick={() => {
                        setTransaction(transaction)
                        setOpenPopUp(true)
                      }}>View</button></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={trans.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      
      {openPopUp===true &&(
       <div>
                 <TransactionAction transaction={transaction} openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />

       </div>
      )
      }
        

      


      {/* <Dialog open={openPopUp} maxWidth="lg">
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Demo user={cust} />
        </DialogContent>
      </Dialog> */}
    </>


  );
}
export default PendingTransaction;