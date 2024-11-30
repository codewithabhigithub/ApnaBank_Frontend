import React, { useEffect, useState } from 'react'
import '../manager/PendingCustomer.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import LockerAction from './LockerAction';



const useStyles = makeStyles((theme) => ({
    dialogContent: {
        width: '900px', // Adjust the width as needed
        height: '500px',
    },
}));
// import PopUp from './PopUp'
export default function Locker(props) {
    
    const{parent,setParent}=props
    const classes = useStyles();
    const [openPopUp, setOpenPopUp] = useState(false)



    const [locker, setlocker] = useState();
    const [lockers, setLockers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const jwt = localStorage.getItem("jwt");

    var cif;

    
    useEffect(() => {
        axios
            .get("http://localhost:8888/lockerEmployee/allApplied", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('User data fetched successfully');

                    setLockers(res.data);
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
                <h1  style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Locker Applications </h1>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>

                                    <TableCell>Application ID</TableCell>
                                    <TableCell>Customer ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lockers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((loc) => (
                                        <TableRow key={loc.id}>
                                            <TableCell>{loc.id}</TableCell>
                                            <TableCell>{loc.cif}</TableCell>
                                            <TableCell>{loc.appliedDate}</TableCell>
                                            <TableCell>{loc.duration}</TableCell>
                                            <TableCell>{loc.status}</TableCell>

                                            <TableCell><button onClick={() => {

                                                setlocker(loc);
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
                        count={lockers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            {openPopUp === true && (

                <div>

                    <LockerAction
                        locker={locker}
                        openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp}

                    />

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
