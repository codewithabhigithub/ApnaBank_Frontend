import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import './ChangePin.css';
import { Field, Form, Formik } from 'formik';
import ErrorMsg from './register/ErrorMsg';
import * as Yup from 'yup';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#eee',
        height: '60%',
        width: '315%',
        paddingLeft: '0rem',
        marginTop: '-4rem'
    },
    dialogContent: {
        width: '340px', // Adjust the width as needed
        height: '250px',
    },
}));

const initialValues = {
    pin: '',
    confirmPin: ''
};

const validationSchema = Yup.object({
    pin: Yup.string().required('PIN is required').length(4, "PIN should be four digit"),
    confirmPin: Yup.string()
        .required('Confirm PIN is required')
        .oneOf([Yup.ref('pin'), null], 'PIN must match'),

});
function ChangePin(props) {
    const classes = useStyles();
    const { openChangePinPopUp, setOpenChangePinPopUp } = props;
    const jwt = localStorage.getItem("jwt");
    const [formValues, setFormValues] = useState(initialValues);
    const [pin, setPin] = useState('')
    const onBack = () => {
        setOpenChangePinPopUp(false);
        console.log('backed');
    };
    const handleChangePin = () => {
        console.log(pin)
        axios.get("http://localhost:8888/creditCard/customer/setPin/" + pin, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                console.log(res);
                alert("PIN Change Succussful")
                setOpenChangePinPopUp(false)
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data)
                setOpenChangePinPopUp(true)
            });
    }
    return (
        <Dialog open={openChangePinPopUp} maxWidth="lg">
            <DialogTitle> Welcome to Apna Bank</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <div>
                    <section className={classes.root}>
                        <Grid container spacing={3} className={classes.profileSection}>
                            <Grid item xs={12} sm={6} md={4} className={classes.profileSection}>
                                <Paper elevation={3} className={classes.profilePaper}>

                                    <Formik
                                        className="container-change-pin"
                                        initialValues={formValues}
                                        onSubmit={handleChangePin}
                                        validationSchema={validationSchema}
                                    >
                                        {(formik) => (
                                            <div className="form-container-change-pin">
                                                <Form className="container-change-pin" style={{ marginTop: '4rem' }}>
                                                    <>
                                                        <h2>Change PIN</h2>


                                                        <div className="form-control-change-pin">
                                                            <label htmlFor="pin">Enter PIN</label>
                                                            <Field className="input-field-change-pin"
                                                                type="password"
                                                                id="pin"
                                                                name="pin"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.pin}
                                                            />
                                                            {formik.touched.pin && formik.errors.pin && (
                                                                <ErrorMsg>{formik.errors.pin}</ErrorMsg>
                                                            )}
                                                        </div>
                                                        <div className="form-control-change-pin">
                                                            <label htmlFor="confirmPassword">Confirm PIN</label>
                                                            <Field className="input-field-change-pin"
                                                                type="password"
                                                                id="confirmPin"
                                                                name="confirmPin"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.confirmPin}
                                                            />
                                                            {formik.touched.confirmPin && formik.errors.confirmPin && (
                                                                <ErrorMsg>{formik.errors.confirmPin}</ErrorMsg>
                                                            )}
                                                        </div>
                                                        <div className="button-container-change-pin">
                                                            <button type="submit" className="card-change-pin" style={{
                                                                fontFamily: 'LatoRegular'
                                                                , borderRadius: '50px',
                                                                backgroundColor: '#861f41',
                                                            }} onClick={(e) => setPin(formik.values.pin)} >
                                                                Change PIN
                                                            </button>
                                                            <button type="button" style={{
                                                                fontFamily: 'LatoRegular'
                                                                , borderRadius: '50px',
                                                                backgroundColor: '#861f41',
                                                            }} className="card-change-pin" onClick={onBack}>
                                                                Cancel
                                                            </button>

                                                        </div>
                                                    </>

                                                </Form>
                                            </div>
                                        )}
                                    </Formik>
                                </Paper>
                            </Grid>
                        </Grid>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ChangePin;
