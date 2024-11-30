import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import '../manager/Demo.css'
import axios from 'axios';
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

 
function ApplyCreditCardAction(props) {
    const classes = useStyles();
    const {openApplyPopUp, setOpenApplyPopUp,user} = props;
    const [approvalStatus, setApprovalStatus] = useState(false);
    const jwt = localStorage.getItem("jwt");
  
    const onBack = () => {
   setOpenApplyPopUp(false)
        console.log('backed')
    }
    const handleApply = () => {
        axios.get("http://localhost:8888/creditCard/customer/apply/creditCard", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                console.log(res);
                alert("Approved Succesfully")
                setOpenApplyPopUp(false)
                setApprovalStatus(true); 
                // window.location.reload(); 
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data)
                setOpenApplyPopUp(false)
            });
    }
  
  

    return (
        
        <Dialog open={setOpenApplyPopUp} maxWidth="lg" >
             <DialogTitle>Credit Card Application </DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <div>

                <section className={classes.root}>
                    {user && (
                        <Grid container spacing={3} className={classes.profileSection}>
                            <Grid item xs={4} className={`${classes.profileSection2} profile-section`}>
                                <Paper elevation={3} className="profile-paper">
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center">
                                                        <h1 className="profile-heading">Application</h1>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Applicable Card Limit</TableCell>
                                                    <TableCell>₹ 1,50,000 <span style={{opacity:'0.6',marginLeft: '5px' }}></span></TableCell>
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
                                                {/* <TableRow>
                                                    <TableCell>Account Type:</TableCell>
                                                    <TableCell>{props.user.accountType}</TableCell>
                                                </TableRow> */}
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
                                                            <button className="approveButton" onClick={handleApply}>Apply</button>

                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                {/* <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <div className="buttonContainer">
                                                            <button className="rejectButton" onClick={handleReject}>Reject</button>

                                                        </div>
                                                    </TableCell>
                                                </TableRow> */}
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <div className="buttonContainer">
                                                            <button className="backButton" onClick={onBack}>Cancel</button>
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

export default ApplyCreditCardAction;
