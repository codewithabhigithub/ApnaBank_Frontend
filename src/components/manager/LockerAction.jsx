import React, { Link,useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
// import './ProfileManager.css';
// import './LoanAction.css'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#eee',
        marginTop: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        height: '100%',
        width: '150%',
    }
}));

export default function LockerAction(props) {
    const [data, setData] = useState(null);
    const [customer, setCustomer] = useState(null);
    const jwt = localStorage.getItem("jwt");
    const classes = useStyles();
    const { openPopUp, setOpenPopUp, locker } = props;

    const [approveClicked, setApproveClicked] = useState(false);

    const [open, setOpen] = useState(false);
    useEffect(() => {
        //     // setApplication(application);

        axios.get("http://localhost:8888/manager/customer/" + locker.cif, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {

                console.log(res.data)
                setCustomer(res.data);

            })
            .catch((err) => {
                console.log(err);
                // Handle error
            });
    }, []);


    const onBack = () => {
        setOpenPopUp(false)
        console.log('backed')
    }




    return (
        <>
            {customer &&
                <Dialog open={openPopUp} maxWidth="lg">
                    <DialogTitle>Locker Details</DialogTitle>
                    <section className={classes.root}>
                        {locker && (
                            <Grid container spacing={3}>



                                {/* Personal Details */}
                                <Grid item xs={4} className={`${classes.profileSection2} profile-section`}>
                                    <Paper elevation={3} className="profile-paper">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className="profile-heading">Customer Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Customer ID</TableCell>
                                                        <TableCell> {customer.cif}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell> {customer.firstName} {customer.lastName}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Mobile Number</TableCell>
                                                        <TableCell> {customer.mobileNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>E-Mail </TableCell>
                                                        <TableCell> {customer.email}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Aadhar </TableCell>
                                                        <TableCell> {customer.aadharNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>PAN</TableCell>
                                                        <TableCell> {customer.panNumber}</TableCell>
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
                                                            <h1 className="profile-heading">Locker Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Locker ID </TableCell>
                                                        <TableCell>{locker.lockerId}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Customer ID  </TableCell>
                                                        <TableCell>{locker.cif}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Locker Name </TableCell>
                                                        <TableCell>{locker.lockerNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Duration </TableCell>
                                                        <TableCell>{locker.duration}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Status </TableCell>
                                                        <TableCell>{locker.status}</TableCell>
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





                        {/* <button className="button2"  onClick={handleReject}>Reject</button> */}
                        <button className="button3" style={{
                            fontFamily: 'LatoRegular'
                            , borderRadius: '50px',
                            backgroundColor: '#861f41',
                        }} onClick={onBack}>Close</button>
                    </div>
                </Dialog>

            }
        </>

    );
}

