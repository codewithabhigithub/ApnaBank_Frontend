import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import './Demo.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Nav } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#eee',

        height: '100%',
        width: '140%',
        paddingLeft: '2rem',
    },
    dialogContent: {
        width: '900px', // Adjust the width as needed
        height: '500px',
      }

}));


export default function TransactionAction(props) {
    const classes = useStyles();
    const {openPopUp, setOpenPopUp,transaction} = props;
    const [approvalStatus, setApprovalStatus] = useState(false);


    const nav = useNavigate();
    const jwt = localStorage.getItem("jwt");
  
    const onBack = () => {
   setOpenPopUp(false)
        console.log('backed')
    }
    const handleApproval = () => {

        axios.get("http://localhost:8888/transactionByManager/approve/" +transaction.transactionId , {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                console.log(res);
                alert("Approved Succesfully")
                setOpenPopUp(false)
                setApprovalStatus(true); 
                window.location.reload(); 
            })
            .catch((err) => {
                console.log(err);
                setOpenPopUp(false)
            });
    }
    const handleReject = () => {
        axios.get("http://localhost:8888/transactionByManager/reject/" + transaction.transactionId, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                console.log(res);
                alert("Rejected Succesfully")
                setOpenPopUp(false)
                window.location.reload(); 
            })
            .catch((err) => {
                console.log(err);
                setOpenPopUp(false)
            });
    }
  

    return (
        
        <Dialog open={openPopUp} maxWidth="lg" >
             <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <div>

                <section className={classes.root}>
                    {props && (
                        <Grid container spacing={3} className={classes.profileSection}>
                            <Grid item xs={4} className={`${classes.profileSection2} profile-section`}>
                                <Paper elevation={3} className="profile-paper">
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center">
                                                        <h1 className="profile-heading">Transaction Details</h1>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Transaction Id:</TableCell>
                                                    <TableCell>{transaction.transactionId}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sender Account Number:</TableCell>
                                                    <TableCell> {transaction.senderAccountNumber}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Amount:</TableCell>
                                                    <TableCell>{transaction.amount}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Receiver Account Number:</TableCell>
                                                    <TableCell>{transaction.receiverAccountNumber}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Receiver Bank Name:</TableCell>
                                                    <TableCell>{transaction.receiverBankName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Date:</TableCell>
                                                    <TableCell>{transaction.dateOfTransaction}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Status:</TableCell>
                                                    <TableCell>{transaction.status}</TableCell>
                                                </TableRow>
                                                
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.profileSection}>
                                <Paper elevation={3} className={classes.profilePaper}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center">
                                                        <h1 className={classes.profileHeading}>Action</h1>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <div className="buttonContainer">
                                                            <button className="approveButton" onClick={handleApproval}>Approve</button>

                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <div className="buttonContainer">
                                                            <button className="rejectButton" onClick={handleReject}>Reject</button>

                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <div className="buttonContainer">
                                                            <button className="backButton" onClick={onBack}>Back</button>

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
                {/* <button>submit</button> */}
            </div>
            </DialogContent>
        </Dialog>
    );
}


