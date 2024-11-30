import React, { useEffect, useState } from 'react';
import './AllWorker.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

function AllWorker() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios
      .get("http://localhost:8888/admin/find/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
            console.log('User data fetched successfully');
            console.log(res)
            setUsers(res.data);
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
    <div className="all-worker-container">
      <h1>All Employees</h1>
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Location</TableCell>             
                <TableCell>Ifsc</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.employeeId}>
                    <TableCell>{user.employeeId}</TableCell>
                    <TableCell>{user.mobileNumber}</TableCell>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.branchName}</TableCell>
                    <TableCell>{user.ifsc}</TableCell>
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
  );
}

export default AllWorker;
