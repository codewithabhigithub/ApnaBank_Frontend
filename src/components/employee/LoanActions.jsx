import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import '../manager/LoanAction.css'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#eee',
        marginTop: '0rem',
        marginLeft: '0rem',
        marginRight: '0rem',
        height: '100%',
        width: '100%',
    }
}));

export default function LoanActions(props) {
    const [account, setAccount] = useState(null);
    const jwt = localStorage.getItem("jwt");
    const classes = useStyles();
    const { openPopUp, setOpenPopUp, application } = props;
    const [amount, setAmount] = useState('');
    const [approveClicked, setApproveClicked] = useState(false);

    const [open, setOpen] = useState(false);
    useEffect(() => {
        //     // setApplication(application);
        console.log("view " + application.cif)
        console.log("hiiiiiiiiiiiii")
        axios.get("http://localhost:8888/employeeLoan/allApplied", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {

                console.log(res.data)
                setAccount(res.data);

            })
            .catch((err) => {
                console.log(err);
                // Handle error
            });
    }, []);
    const handleReject = () => {
        axios.get("http://localhost:8888/employeeLoan/reject/" + application.id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                console.log(res);
                alert("Rejected Succesfully")
                setOpenPopUp(false)
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                setOpenPopUp(false)
            });
    }

    const onBack = () => {
        setOpenPopUp(false)
        console.log('backed')
    }
    const handleApproval = () => {
        // const url = `http://localhost:8888/managerLoan/sanction/${application.id}/${amount}/${account.accountNumber}`;

        axios.
            get("http://localhost:8888/employeeLoan/verify/" + application.id, {
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res) => {
                console.log(res);
                alert("Approved Successfully");
                // window.location.reload(false);
                setOpenPopUp(false);



            })
            .catch((err) => {
                console.log(err);
                setOpenPopUp(false);
            });
    }



    return (
        <>
            {account &&
                <Dialog open={openPopUp} maxWidth="lg">
                    <DialogTitle style={{ fontFamily: 'LatoBold', fontWeight: 'bold' }} >Loan Application</DialogTitle>
                    <section className={classes.root}>
                        {application && (
                            <Grid container spacing={3}>

                                {/* Loan Details */}
                                <Grid item xs={4} className={`${classes.profileSection4} profile-section`}>
                                    <Paper elevation={3} className="profile-paper">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className="profile-heading" style={{ fontFamily: 'LatoBold', fontWeight: 'bold' }} >Loan Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Application ID</TableCell>
                                                        <TableCell>{application.id}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Type</TableCell>
                                                        <TableCell>{application.loanType}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Amount</TableCell>
                                                        <TableCell>{application.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Duration</TableCell>
                                                        <TableCell>{application.duration}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Application Date</TableCell>
                                                        <TableCell>{application.applyDate}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>
                                {/* Personal Details */}
                                <Grid item xs={4} className={`${classes.profileSection2} profile-section`}>
                                    <Paper elevation={3} className="profile-paper">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className="profile-heading" style={{ fontFamily: 'LatoBold', fontWeight: 'bold' }} >Personal Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Customer ID</TableCell>
                                                        <TableCell> {application.cif}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell> {application.firstName} {application.lastName}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Mobile Number</TableCell>
                                                        <TableCell> {application.mobileNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>E-Mail </TableCell>
                                                        <TableCell> {application.email}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Aadhar </TableCell>
                                                        <TableCell> {application.aadharNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>PAN</TableCell>
                                                        <TableCell> {application.panNumber}</TableCell>
                                                    </TableRow>

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>

                                {/* bank Details */}
                                <Grid item xs={4} className={`${classes.profileSection3} profile-section`}>
                                    <Paper elevation={3} className="profile-paper">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className="profile-heading" style={{ fontFamily: 'LatoBold', fontWeight: 'bold' }} >Account Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Account Number </TableCell>
                                                        <TableCell>{account.accountNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Account Type </TableCell>
                                                        <TableCell>{account.accountType}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>IFSC </TableCell>
                                                        <TableCell>{account.ifscCode}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Branch Name </TableCell>
                                                        <TableCell>{account.branchName}</TableCell>
                                                    </TableRow>


                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>


                            </Grid>
                        )}
                    </section>
                    {/* Approve Button */}

                    <div className="button-container">
                        {/* Approval Section */}

                        <button className="button1" style={{
                            fontFamily: 'LatoRegular'
                            , borderRadius: '50px',
                            backgroundColor: '#861f41', color: 'white'
                        }} onClick={handleApproval}>
                            Verify
                        </button>



                        <button className="button2" style={{
                            fontFamily: 'LatoRegular'
                            , borderRadius: '50px',
                            backgroundColor: '#861f41', color: 'white'
                        }} onClick={handleReject}>Reject</button>

                        {/* <button className="button2"  onClick={handleReject}>Reject</button> */}
                        <button className="button3" style={{
                            fontFamily: 'LatoRegular'
                            , borderRadius: '50px',
                            backgroundColor: '#861f41', color: 'white'
                        }} onClick={onBack}>Back</button>
                    </div>
                </Dialog>

            }
        </>

    );
}

