import { MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { useAuth } from '../utility/auth'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#eee',
        height: '200%',
        width: '140%',
        paddingLeft: '2rem',
    },
    dialogContent: {
        width: '800px', // Adjust the width as needed
        height: '550px',
    }
}));

export default function CreateGiftCard(props) {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState();
    const [cif, setCif] = useState();
    const jwt = localStorage.getItem("jwt");
    const [amount, setAmount] = useState('');
    const [recname, setRecname] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const { openPopUp, setOpenPopUp } = props;
    const [showAlert, setShowAlert] = useState(false);
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const auth = useAuth();
    useEffect(() => {
        axios.get("http://localhost:8888/transaction/find/allAccounts", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.jwt}`,
            },
        })
            .then((res) => {
                setAccounts(res.data);
                if (res.data.length > 0) {
                    setCif(res.data[0].cif);
                }
            })
            .catch((err) => {
                console.log(err);
                // Handle error
            });
        axios.get("http://localhost:8888/giftCard/findAll/giftCardsOffer", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.jwt}`,
            },
        })
            .then((res) => {
                setCards(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
                // Handle error
            });
    }, []);
    const handleCreate = () => {
        if (!selectedAccount) {
            alert("Please Select your account");
            return;
        }
        if ((selectedAccountData.balance - amount) < selectedAccountData.minimumbalanceRequired) {
            alert("Insufficient fund");
            return;
        }
        if (!selectedAccountData.status) {
            alert("Account is inactive");
            return;
        }
        if (!selectedCard) {
            alert("Please Select Gift Card")
            return;
        }
        if (!amount) {
            alert("Please Enter Gift Card Amount")
            return;
        }
        if (amount <= 0) {
            alert("Amount Should greater than Zaro")
            return;
        }
        if (amount >= 50000) {
            alert("Amount Should be less than 50,000")
            return;
        }

        // console.log(selectedAccountData.accountNumber)
        const payload = {
            recname: recname,
            amount: amount,
            giftCardName: selectedCard,
            discount: selectedCardData.discount

        }
        // console.log(payload)

        axios.post("http://localhost:8888/giftCard/create/" + selectedAccountData.accountNumber + "/" + selectedCardData.discount, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.jwt}`,
            },
        })
            .then((res) => {
                alert("Created Successfully");
                setOpenPopUp(false)
            })
            .catch((err) => {
                console.log(err);
                setOpenPopUp(true)
            });
    }
    const handleAccountChange = (event) => {
        setSelectedAccount(event.target.value);
    };
    const handleCardChange = (event) => {
        setSelectedCard(event.target.value);
    };
    const selectedAccountData = accounts.find(
        (account) => account.accountNumber === selectedAccount
    );
    const selectedCardData = cards.find(
        (card) => card.name === selectedCard
    )
    const onBack = () => {
        setOpenPopUp(false)
        console.log('backed')
    }
    return (
        <>
            <Dialog open={openPopUp} maxWidth="lg">
                <DialogTitle>Create Gift Cards</DialogTitle>

                <section className={classes.root}>
                    {accounts && (
                        <Grid container spacing={3} className={classes.profileSection}>
                            <Grid item xs={12} sm={6} md={4} className={classes.profileSection}>
                                <Paper elevation={3} className={classes.profilePaper}>
                                    <TableContainer>
                                        <Table className="transaction-customer-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center">
                                                        <h1 className={classes.profileHeading}>Account Details</h1>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                <TableRow>
                                                    <TableCell>Account Number</TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={selectedAccount}
                                                            onChange={handleAccountChange}
                                                        >
                                                            <MenuItem disabled value="">select</MenuItem>
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
                                                    <TableCell>Type</TableCell>
                                                    {selectedAccountData &&
                                                        <TableCell>{selectedAccountData.accountType}</TableCell>
                                                    }
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Avl. Balance</TableCell>
                                                    {selectedAccountData &&
                                                        <TableCell> {parseFloat(selectedAccountData.balance).toFixed(2)}</TableCell>
                                                    }
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Branch</TableCell>
                                                    <TableCell>Apna Branch</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Status</TableCell>
                                                    {selectedAccountData && selectedAccountData.status && <TableCell>Active</TableCell>}
                                                    {selectedAccountData && !selectedAccountData.status && <TableCell>Inactive</TableCell>}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                            {/* ------------------GIFT */}
                            {/* <Grid container spacing={3} className={classes.profileSection}> */}
                            <Grid item xs={12} sm={6} md={4} className={classes.profileSection}>
                                <Paper elevation={3} className={classes.profilePaper}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center">
                                                        <h1 className={classes.profileHeading}>Gift Card</h1>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Recipient Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="text"
                                                            name="recname"
                                                            placeholder='enter name'
                                                            value={recname}
                                                            onChange={(e) => { setRecname(e.target.value) }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={selectedCard}
                                                            onChange={handleCardChange}
                                                        >
                                                            <MenuItem disabled value="">select</MenuItem>
                                                            {cards.map((gift) => (
                                                                <MenuItem
                                                                    value={gift.name}
                                                                    key={gift.name}>
                                                                    {gift.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Gift Card Amount</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="text"
                                                            name="amount"
                                                            placeholder='enter amount'
                                                            value={amount}
                                                            onChange={(e) => { setAmount(e.target.value) }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Discount </TableCell>
                                                    {selectedCardData && (
                                                        <TableCell>
                                                            {selectedCardData.discount} % off
                                                        </TableCell>
                                                    )}

                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Amount To Pay </TableCell>
                                                    {selectedCardData && (
                                                        <TableCell>
                                                            {amount - (selectedCardData.discount * amount) / 100}
                                                        </TableCell>
                                                    )}

                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={2}>
                                                        <div>
                                                            <button style={{
                                                                fontFamily: 'LatoRegular'
                                                                , borderRadius: '50px',
                                                                backgroundColor: '#861f41',
                                                            }} className="credit-card-customer-button1" onClick={handleCreate}>Buy Gift Card</button>
                                                            <button style={{
                                                                fontFamily: 'LatoRegular'
                                                                , borderRadius: '50px',
                                                                backgroundColor: '#861f41',
                                                            }} className="credit-card-customer-button1" onClick={onBack}>Close</button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                            {/* </Grid> */}
                        </Grid>
                    )}
                </section>

            </Dialog>
        </>
    );
}
