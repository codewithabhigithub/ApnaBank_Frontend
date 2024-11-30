import React, { useEffect, useState } from 'react';
import './ApplyLoan.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorMsg from './register/ErrorMsg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  aadharNumber: '',
  panNumber: '',
  gender: '',
  email: '',
  mobileNumber: '',
  loanType: '',
  amount: '',
  duration: '',
};

const validationSchema = Yup.object({
  loanType: Yup.string().required('Loan type is required'),
  amount: Yup.string()
    .required('Amount is required')
    .matches(/^[0-9]{6,8}$/, 'Not eligible for this amount, please enter again'),
  duration: Yup.string()
    .required('Duration is required')
    .matches(/^[0-9]{1,2}$/, 'Invalid duration, please enter a number between 1 and 99'),
});

const ApplyLoan = () => {
  const [step, setStep] = useState(1); // Current step of the form
  const [formValues, setFormValues] = useState(initialValues); // Form values state
  const nav = useNavigate();
  const jwt = localStorage.getItem('jwt')
  const [data, setData] = useState(null);

  const handleSubmit = (v) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      dob: data.dob,
      aadharNumber: data.aadharNumber,
      panNumber: data.panNumber,
      gender: data.gender,
      email: data.email,
      mobileNumber: data.mobileNumber,
      loanType: v.loanType,
      amount: v.amount,
      duration: v.duration,
    };

    console.log(payload);
    axios
      .post("http://localhost:8888/customerLoan/apply", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => {
        console.log(res)
        alert("Submitted Successfully");
      }).catch((err) => {
        console.log(err);
        alert(err.response.data);
      })

  };

  useEffect(() => {
    axios.get("http://localhost:8888/customer/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, []);

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Formik
      className="container"
      initialValues={formValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <div className="form-container">
          {data && (
            <>
              <Form className="container" style={{ marginTop: '4rem' }}>
                {step === 1 && (
                  <>
                    <h2>Application</h2>
                    <div className="form-control">
                      <label htmlFor="loanType">Loan Type</label>
                      <Field className="input-field"
                        as="select"
                        id="loanType"
                        name="loanType"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.loanType}
                      >
                        <option value="">Select Loan Type</option>
                        <option value="homeLoan">HOME_LOAN</option>
                        <option value="vehicleLoan">VEHICLE_LOAN</option>
                        <option value="goldLoan">GOLD_LOAN</option>
                        <option value="landLoan">LAND_LOAN</option>
                      </Field>
                      {formik.touched.loanType && formik.errors.loanType && (
                        <ErrorMsg>{formik.errors.loanType}</ErrorMsg>
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="amount">Amount</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="amount"
                        name="amount"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                      />
                      {formik.touched.amount && formik.errors.amount && (
                        <ErrorMsg>{formik.errors.amount}</ErrorMsg>
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="duration">Duration (in-months)</label>
                      <Field
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        className="input-field"
                        type="text"
                        id="duration"
                        name="duration"
                        onChange={formik.handleChange}
                        value={formik.values.duration}
                      />
                      {formik.touched.duration && formik.errors.duration && (
                        <ErrorMsg>{formik.errors.duration}</ErrorMsg>
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="firstName">First Name</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="lastName">Last Name</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="lastName"
                        name="lastName"
                        disabled
                        value={data.lastName}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="email">E-Mail</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="email"
                        name="email"
                        disabled
                        value={data.email}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        disabled
                        value={data.mobileNumber}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="dob">DOB</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="date"
                        id="dob"
                        name="dob"
                        disabled
                        value={data.dob}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="aadharNumber">Aadhar Number</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="aadharNumber"
                        name="aadharNumber"
                        disabled
                        value={data.aadharNumber}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="panNumber">PAN Card</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="panNumber"
                        name="panNumber"
                        disabled
                        value={data.panNumber}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="gender">Gender</label>
                      <Field className="input-field"
                        style={{
                          backgroundColor: '#FAF3F0', width: '60%',
                          padding: ' 5px',
                          borderRadius: '50px',
                          flex: 1
                        }}
                        type="text"
                        id="gender2"
                        name="gender"
                        disabled
                        value={data.gender}
                      />
                    </div>
                    <div className="button-container">
                      <button type="submit" className="go-next"
                        style={{
                          fontFamily: 'LatoRegular',
                          textAlign: 'center'
                          , borderRadius: '50px',
                          backgroundColor: '#861f41',
                        }} >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </Form>
            </>
          )}
        </div>
      )}
    </Formik>
  );
};

export default ApplyLoan;
