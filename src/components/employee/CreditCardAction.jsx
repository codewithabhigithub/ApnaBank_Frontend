import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import '../manager/LoanAction.css'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#eee',
        marginTop: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        height: '100%',
        width: '286%',
    }
}));

export default function CreditCardAction(props) {
    const [card, setCard] = useState(null);
    const jwt = localStorage.getItem("jwt");
    const classes = useStyles();
    const { openPopUp, setOpenPopUp, application } = props;


   
    const handleReject = () => {
        axios.delete("http://localhost:8888/creditCard/employee/remove/"+ application.cif, {
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
  
    const onBack = () => {
        setOpenPopUp(false)
             console.log('backed')
         }
         const handleApproval = () => {
            // const url = `http://localhost:8888/managerLoan/sanction/${application.id}/${amount}/${account.accountNumber}`;

            axios.
           get("http://localhost:8888/creditCard/employee/approve/"+application.cif, {
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            })
              .then((res) => {
                console.log(res);
                alert("Approved Successfully");
                setOpenPopUp(false);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
                setOpenPopUp(false);
              });
          }
        
         
        
    return (
        <>
            {application &&
                <Dialog open={openPopUp} maxWidth="lg">
<DialogTitle>Credit Card Application</DialogTitle>
                    <section className={classes.root}>
                        {application && (
                            <Grid container spacing={3}>

                                {/* Loan Details */}
                                {/* <Grid item xs={4} className={`${classes.profileSection4} profile-section`}>
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
                                                        <TableCell>{application.cif}</TableCell>
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
                                </Grid> */}
                                {/* Personal Details */}
                                <Grid item xs={4} className={`${classes.profileSection2} profile-section`}>
                                    <Paper elevation={3} className="profile-paper">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className="profile-heading">Application Details</h1>
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
                                {/* <Grid item xs={4} className={`${classes.profileSection3} profile-section`}>
                                    <Paper elevation={3} className="profile-paper">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center">
                                                            <h1 className="profile-heading">Credit Card Details</h1>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Card Number </TableCell>
                                                        <TableCell>{card.creditCardNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>CVV  </TableCell>
                                                        <TableCell>{card.cvv}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Card Limit </TableCell>
                                                        <TableCell>{card.maximumLimit}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Expiry Date </TableCell>
                                                        <TableCell>{card.expiryDate}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Status </TableCell>
                                                        <TableCell>Inactive</TableCell>
                                                    </TableRow>

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid> */}



                            </Grid>
                        )}
                    </section>
                    {/* Approve Button */}
         
                    <div className="button-container">
           {/* Approval Section */}
           
           
        
          
              <button className="button1" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41', color: 'white'}} onClick={handleApproval}>Approve</button>
           

            <button className="button2" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41', color: 'white'}} onClick={handleReject}>Reject</button>
        
            {/* <button className="button2"  onClick={handleReject}>Reject</button> */}
            <button className="button3" style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41', color: 'white'}} onClick={onBack}>Back</button>
          </div>
                </Dialog>

            }
        </>

    );
}

