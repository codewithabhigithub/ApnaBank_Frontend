import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import './MakeCardPayment.css'
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#eee',

    height: '100%',
    width: '285%',
    paddingLeft: '2rem',
  },
  dialogContent: {
    width: '400px', // Adjust the width as needed
    height: '450px',
  }

}));


function MakeCardPayment(props) {
  const classes = useStyles();
  const { openPaymentPopUp, setOpenPaymentPopUp } = props;
  const [card, setCard] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const [pin, setPin] = useState();
  const [paymentData, setPaymentData] = useState({ amount: '', description: '', receiverDetails: '' });

  const onBack = () => {
    setOpenPaymentPopUp(false)
    console.log('backed')
  }
  useEffect(() => {
    axios.get("http://localhost:8888/creditCard/customer/creditCard", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setCard(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, []);
  const makePayment = () => {
    if (card.pin != pin) {
      alert("wrong PIN")
      return;
    }
    if (card.remainingLimit < paymentData.amount) {
      alert("Insufficient Find")
      return;
    }
    if (!card.status) {
      alert("card is blocked")
      return;
    }
    const payload = {
      amount: paymentData.amount,
      description: paymentData.description,
      receiverDetails: paymentData.receiverDetails
    }
    const confirmed = window.confirm(`Are you sure you want to send ₹ ${paymentData.amount} to ${paymentData.receiverDetails}?`);
    if (!confirmed) {
      return;
    }
    console.log(payload)
    axios.post("http://localhost:8888/creditCard/customer/cardPayment/" + pin, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        alert("Payment Succussful")
        setOpenPaymentPopUp(false)
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data)
        setOpenPaymentPopUp(true)
      });
  }


  return (
    <Dialog open={setOpenPaymentPopUp} maxWidth="lg">
      <DialogTitle> Welcome to Apna Bank</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div>
          <section className={classes.root}>
            {card && (
              <Grid container spacing={3} className={classes.profileSection}>
                <Grid item xs={12} sm={6} md={4} className={classes.profileSection}>
                  <Paper elevation={3} className={classes.profilePaper}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              <h1 className={classes.profileHeading}>Card Payment</h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Amount:</TableCell>
                            <TableCell>
                              <TextField
                                type="text"
                                name="amount"
                                placeholder='enter amount'
                                value={paymentData.amount}
                                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Description:</TableCell>
                            <TableCell>
                              <TextField
                                type="text"
                                name="description"
                                placeholder='enter description'
                                value={paymentData.description}
                                onChange={(e) => setPaymentData({ ...paymentData, description: e.target.value })}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Receiver Details:</TableCell>
                            <TableCell>
                              <TextField
                                type="text"
                                name="receiverDetails"
                                placeholder='enter receiver details'
                                value={paymentData.receiverDetails}
                                onChange={(e) => setPaymentData({ ...paymentData, receiverDetails: e.target.value })}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Credit Card PIN:</TableCell>
                            <TableCell>
                              <TextField
                                type="password"
                                name="creditCardPin"
                                placeholder='enter PIN'
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div>
                                <button className="credit-card-customer-button1" style={{
                                  fontFamily: 'LatoRegular'
                                  , borderRadius: '50px',
                                  backgroundColor: '#861f41',
                                }} onClick={makePayment}>Payment</button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <button className="credit-card-customer-button1" style={{
                                  fontFamily: 'LatoRegular'
                                  , borderRadius: '50px',
                                  backgroundColor: '#861f41',
                                }} onClick={onBack}>Cancel</button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default MakeCardPayment;
