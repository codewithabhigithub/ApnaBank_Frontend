import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import './ProfileManager.css';
import adminLogo from './admin1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#eee',
    marginTop: '4rem',
    marginLeft: '16rem',
    marginRight: '0rem',
    height: '100%',
    width: '84%',
  }
}));

function ProfileManager() {
  const [data, setData] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const classes = useStyles();

  useEffect(() => {
    axios.get("http://localhost:8888/manager/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
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
                <p className="text-line"><h1>Empowering Financial Success for our Customers !</h1></p>
              </div> */}
              <Grid container spacing={3} alignItems="center" justify="center">
                {/* <Grid item>
                  <img
                    src={adminLogo}
                    alt="avatar"
                    style={{ width: '150px', borderRadius: '50%' }}
                  />
                </Grid> */}
                <Grid item>
                  <p className="text-muted mb-1">
                    <h1 align="center">Manager Data</h1>
                  </p>
                  {/* <p className="text-muted mb-4">TechBank</p> */}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Official Details */}
          <Grid item xs={12} className={`${classes.profileSection3} profile-section`}>
            <Paper elevation={30} className="profile-paper">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <h1 className="profile-heading">Official Details</h1>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Role:</TableCell>
                      <TableCell>{data.position}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>E-Mail Id:</TableCell>
                      <TableCell>{data.firstName}Apnabank.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Branch Name:</TableCell>
                      <TableCell>{data.branchName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Branch Code:</TableCell>
                      <TableCell>{data.branchCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IFSC Code:</TableCell>
                      <TableCell>{data.ifsc}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
          <Grid item xs={12} className={`${classes.profileSection4} profile-section`}>
            <Paper elevation={30} className="profile-paper">
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
                    {/* <TableRow>
                      <TableCell>House Number:</TableCell>
                      <TableCell>{`${data.address.houseNo} ${data.lastName}`}</TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell>Street:</TableCell>
                      <TableCell>{data.address.street}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell>Locality:</TableCell>
                      <TableCell>{data.address.locality}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Taluk:</TableCell>
                      <TableCell>{data.address.taluka}</TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell>District:</TableCell>
                      <TableCell>{data.address.district}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>State:</TableCell>
                      <TableCell>{data.address.state}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country:</TableCell>
                      <TableCell>{data.address.country}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PIN code:</TableCell>
                      <TableCell>{data.address.pincode}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </section>
  );
}

export default ProfileManager;
