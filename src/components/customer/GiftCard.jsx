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
import {  makeStyles } from '@material-ui/core';
import CreateGiftCard from './CreateGiftCard'
import './GiftCard copy.css'
import { useAuth } from '../utility/auth'
const useStyles = makeStyles((theme) => ({
    dialogContent: {
        width: '900px', // Adjust the width as needed
        height: '500px',
    },
}));
// import PopUp from './PopUp'
export default function GiftCard() {
    const classes = useStyles();
    const [openPopUp, setOpenPopUp] = useState(false)
    const auth=useAuth();
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        axios
            .get("http://localhost:8888/giftCard/find/giftcards", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.jwt}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('User data fetched successfully');
                    setCards(res.data);
                } else {
                    console.log('Failed to fetch user data');
                }

            })
            .catch((err) => {
                console.log(err);
                // Handle error
            });
    }, [openPopUp]);

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
                <h1>All Gift Cards</h1>
                <div >
                    <button className='gift-card-create-btn' onClick={()=>{setOpenPopUp(true)}}
                    >Create Gift Card</button>
                </div>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Gift Card ID</TableCell>
                                    <TableCell>Recipient Name</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Status</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((gift) => (
                                        <TableRow key={gift.id}>
                                            <TableCell>{gift.id}</TableCell>
                                            <TableCell>{gift.recname}</TableCell>
                                            <TableCell>{gift.giftCardName}</TableCell>
                                            <TableCell>{gift.amount}</TableCell>
                                            {gift.redeemed && (
                                                <TableCell>Redeemed</TableCell>
                                            )}
                                             {!gift.redeemed && (
                                                <TableCell>Not Used</TableCell>
                                            )}

                                            
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={cards.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
              
            {openPopUp === true && (
                <div>
                    <CreateGiftCard  openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />

                </div>
            )
            }
        </>


    );
}

// import React from 'react'

// function GiftCard() {
//   return (
//     <div>
//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>
//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//         <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>

//     </div>
//   )
// }

// export default GiftCard