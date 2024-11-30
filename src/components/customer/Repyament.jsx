import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import './Repayment.css'
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
        height: '350px',
    }

}));


function Repyament(props) {
    const classes = useStyles();
    const { openRepaymentPopUp, setOpenRepaymentPopUp, pin } = props;
    const [accounts, setAccounts] = useState([]);
    const jwt = localStorage.getItem("jwt");
    const [selectedAccount, setSelectedAccount] = useState('');
    const [enteredPin, setEnteredPin] = useState('')
    const onBack = () => {
        console.log('backed');
        console.log(selectedAccount)
        setOpenRepaymentPopUp(false)

    }
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


            })
            .catch((err) => {
                console.log(err);
                // Handle error
            });
    }, []);
    const selectedAccountData = accounts.find(
        (account) => account.accountNumber === selectedAccount
    );
    const handleAccountChange = (event) => {
        setSelectedAccount(event.target.value);
    };
    const makeBillPayment = () => {
        if (!selectedAccount) {
            alert("Please select an account");
            return;
        }
        if (!enteredPin) {
            alert("Enter PIN")
            return;
        }
        if (pin != enteredPin) {
            alert("Enter correct pin");
            return;
        }
        const confirmed = window.confirm(`Are you sure you want to pay Credit Card bill?`);
        if (!confirmed) {
            return;
        }
        axios.get("http://localhost:8888/creditCard/customer/bill/cardPayment/" + selectedAccount, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                console.log(res);
                alert("Bill Repayment Succussful")
                setOpenRepaymentPopUp(false)
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data)
                setOpenRepaymentPopUp(true)
            });
    }
    return (
        <Dialog open={openRepaymentPopUp} maxWidth="lg">
            <DialogTitle> Welcome to Apna Bank</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <div>
                    <section className={classes.root}>
                        {accounts && (
                            <Grid container spacing={3} className={classes.profileSection}>
                                <Grid item xs={12} sm={6} md={4} className={classes.profileSection}>
                                    <Paper elevation={3} className={classes.profilePaper}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className={classes.profileHeading}>Bill Payment</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Account:</TableCell>
                                                        <TableCell>
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
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell>Credit Card PIN:</TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                type="password"
                                                                name="creditCardPin"
                                                                placeholder='enter PIN'
                                                                value={enteredPin}
                                                                onChange={(e) => setEnteredPin(e.target.value)}
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
                                                                }} onClick={makeBillPayment}>Payment</button>
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
export default Repyament;
