import React, { useEffect, useState } from 'react'
import './PendingCustomer.css'
import PopUp from './PopUp'
import { Dialog, DialogTitle } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { DialogContent, makeStyles } from '@material-ui/core';
import Profile from '../admin/ProfileAdmin'
import Demo from './Demo';


const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: '900px', // Adjust the width as needed
    height: '500px',
  },
}));
// import PopUp from './PopUp'
function PendingCustomer() {
  const classes = useStyles();
  const [openPopUp, setOpenPopUp] = useState(false)




  const [users, setUsers] = useState([]);
  const [cust, setCust] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios
      .get("http://localhost:8888/manager/pending/customer", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('User data fetched successfully');

          setUsers(res.data);
          console.log(users)
        } else {
          console.log('Failed to fetch user data');
        }

      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="all-worker-container">
        <h1 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >All Employees</h1>
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>EMail Id</TableCell>
                  <TableCell>Account Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.cif}>
                      <TableCell>{user.cif}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>

                      <TableCell>{user.mobileNumber}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.accountType}</TableCell>
                      <TableCell>Pending</TableCell>


                      <TableCell><button onClick={() => {
                        setCust(user)
                        setOpenPopUp(true)
                      }}>View</button></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      
      {openPopUp===true &&(
       <div>
                 <Demo user={cust} openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />

       </div>
      )
      }
        

      


      {/* <Dialog open={openPopUp} maxWidth="lg">
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Demo user={cust} />
        </DialogContent>
      </Dialog> */}
    </>


  );
}
export default PendingCustomer;