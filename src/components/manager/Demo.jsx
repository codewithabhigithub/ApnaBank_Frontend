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


function Demo(props) {
    const classes = useStyles();
    const { openPopUp, setOpenPopUp } = props;
    const [approvalStatus, setApprovalStatus] = useState(false);


    const nav = useNavigate();
    const jwt = localStorage.getItem("jwt");

    const onBack = () => {
        setOpenPopUp(false)
        console.log('backed')
    }
    const handleApproval = () => {
        axios.get("http://localhost:8888/manager/approve/customer/" + props.user.cif, {
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
        axios.get("http://localhost:8888/manager/reject/customer/" + props.user.cif, {
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
            <DialogTitle>Customer Details</DialogTitle>
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
                                                            <h1 className="profile-heading">Customer's Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Customer Id:</TableCell>
                                                        <TableCell>{props.user.cif}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Full Name:</TableCell>
                                                        <TableCell> {`${props.user.lastName} ${props.user.firstName} ${props.user.fatherName}`}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>E-Mail Id:</TableCell>
                                                        <TableCell>{props.user.email}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Mobile Number:</TableCell>
                                                        <TableCell>{props.user.mobileNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Account Type:</TableCell>
                                                        <TableCell>{props.user.accountType}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Aadhar Number:</TableCell>
                                                        <TableCell>{props.user.aadharNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>PAN Number:</TableCell>
                                                        <TableCell>{props.user.panNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Gender:</TableCell>
                                                        <TableCell>{props.user.gender}</TableCell>
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
                                                                <button className="approveButton" style={{
                                                                    fontFamily: 'LatoRegular'
                                                                    , borderRadius: '50px',
                                                                    backgroundColor: '#861f41',
                                                                }} onClick={handleApproval}>Approve</button>

                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>
                                                            <div className="buttonContainer">
                                                                <button className="rejectButton" style={{
                                                                    fontFamily: 'LatoRegular'
                                                                    , borderRadius: '50px',
                                                                    backgroundColor: '#861f41',
                                                                }} onClick={handleReject}>Reject</button>

                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>
                                                            <div className="buttonContainer">
                                                                <button className="backButton" style={{
                                                                    fontFamily: 'LatoRegular'
                                                                    , borderRadius: '50px',
                                                                    backgroundColor: '#861f41',
                                                                }} onClick={onBack}>Back</button>

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

export default Demo;
