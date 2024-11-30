import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import './ProfileCustomer.css'
import adminLogo from '../manager/admin1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#eee',
    marginTop: '4rem',
    marginLeft: '16rem',
    marginRight: '0rem',
    height: '90%',
    width: '84%',
  }
}));

function ProfileCustomer() {
  const [data, setData] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const classes = useStyles();

  useEffect(() => {
    axios.get("http://localhost:8888/customer/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, []);

  return (
    <section className={classes.root}>
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} className={`${classes.profileSection1} profile-section`}>
            {/* Mui Profile Section */}
            <Paper elevation={3} className="profile-paper">
              {/* <div className="moving-text">
                <p className="text-line"><h1>"Welcome back, {data.firstName} {data.lastName}! Your financial journey starts here, at G4-BANK."</h1></p>
              </div> */}
              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item>
                  {/* <img
                    src={adminLogo}
                    alt="avatar"
                    style={{ width: '150px', borderRadius: '50%' }}
                  /> */}
                </Grid>
                <Grid item>
                  <p className="text-muted mb-1">
                    <h1 align="center">Customer Data</h1>
                  </p>
                  {/* <h3 className="text-muted mb-4">Welcome to Tech Bank</h3> */}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Personal Details */}
          <Grid item xs={12} className={`${classes.profileSection2} profile-section`}>
            <Paper elevation={30} className="profile-paper">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <h1 className="profile-heading">Personal Details</h1>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Full Name:</TableCell>
                      <TableCell> {` ${data.firstName} ${data.lastName} `}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>E-Mail Id:</TableCell>
                      <TableCell>{data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mobile:</TableCell>
                      <TableCell>{data.mobileNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mother Name:</TableCell>
                      <TableCell>{data.motherName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Father Name:</TableCell>
                      <TableCell>{data.fatherName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Date Of Birth:</TableCell>
                      <TableCell>{data.dob}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gender:</TableCell>
                      <TableCell>{data.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aadhar Number:</TableCell>
                      <TableCell>{data.aadharNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PAN Number:</TableCell>
                      <TableCell>{data.panNumber}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Address Details */}
          {/* <Grid item xs={4} className={`${classes.profileSection4} profile-section`}>
            <Paper elevation={3} className="profile-paper">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <h1 className="profile-heading">Address Details</h1>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    <TableRow>
                      <TableCell>Street:</TableCell>
                      <TableCell>{data.address.street}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Locality:</TableCell>
                      <TableCell>{data.address.locality}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>District:</TableCell>
                      <TableCell>{data.address.district}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>State:</TableCell>
                      <TableCell>{data.address.state}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PIN code:</TableCell>
                      <TableCell>{data.address.pincode}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid> */}
        </Grid>
      )}
    </section>
  );
}

export default ProfileCustomer;
