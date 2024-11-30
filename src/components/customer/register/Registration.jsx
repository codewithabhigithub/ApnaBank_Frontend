import React, { useState } from 'react';
import './Registration.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorMsg from './ErrorMsg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import register from './register1.jpg'

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
  password: '',
  confirmPassword: '',


};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  fatherName: Yup.string().required("Father's name is required"),
  motherName: Yup.string().required("Mother's name is required"),
  dob: Yup.string().required('Date of Birth is required'),
  aadharNumber: Yup.number().required('Aadhar Number is required'),
  panNumber: Yup.string().required('PAN Number is required'),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string().required('Email is required').email("email format is missing"),
  mobileNumber: Yup.string().required('Mobile Number is required').matches(/^\d+$/, 'Mobile Number should contain only digits').length(10, 'Mobile Number should be exactly 10 digits'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

const Registration = () => {
  const [step, setStep] = useState(1); // Current step of the form
  const [formValues, setFormValues] = useState(initialValues); // Form values state
  const nav = useNavigate();

  const handleSubmit = (values) => {
    const payload = JSON.stringify(values);

    console.log(values);
    axios
      .post("http://localhost:8888/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if ((res.request.status == 200)) {
          alert("Submited Successfully");
          nav('/')
        }
      }).catch((err) => {
        console.log(err);
        alert("Failed Try Again");
      })

  };

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
          {/* <div className='image-container' >
            <img src={register} alt="" className="image" />
          </div> */}
          
          <Form className="container" style={{ marginTop: '4rem' ,backgroundColor : 'black' }}  >
            {step === 1 && (
              <>
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Personal Details</h2>
                <div className="form-control">
                  <label htmlFor="firstName" style={{ fontFamily:'LatoRegular' }} >First Name</label>
                  <Field className="input-field"
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <ErrorMsg>{formik.errors.firstName}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="lastName"  style={{ fontFamily:'LatoRegular' }} >Last Name</label>
                  <Field className="input-field"
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <ErrorMsg>{formik.errors.lastName}</ErrorMsg>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="fatherName"  style={{ fontFamily:'LatoRegular' }} >Father Name</label>
                  <Field className="input-field"
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    onChange={formik.handleChange}
                    value={formik.values.fatherName}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.fatherName && formik.errors.fatherName && (
                    <ErrorMsg>{formik.errors.fatherName}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="motherName"  style={{ fontFamily:'LatoRegular' }} >Mother Name</label>
                  <Field className="input-field"
                    type="text"
                    id="motherName"
                    name="motherName"
                    onChange={formik.handleChange}
                    value={formik.values.motherName}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.motherName && formik.errors.motherName && (
                    <ErrorMsg>{formik.errors.motherName}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="dob"  style={{ fontFamily:'LatoRegular' ,alignItems:'center' }} >DOB</label>
                  <Field className="input-field"
                    type="date"
                    id="dob"
                    name="dob"
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <ErrorMsg>{formik.errors.dob}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="aadharNumber"  style={{ fontFamily:'LatoRegular' }} >Adhar Card</label>
                  <Field className="input-field"
                    type="number"
                    id="aadharNumber"
                    name="aadharNumber"
                    onChange={formik.handleChange}
                    value={formik.values.aadharNumber}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.aadharNumber && formik.errors.aadharNumber && (
                    <ErrorMsg>{formik.errors.aadharNumber}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="panNumber"  style={{ fontFamily:'LatoRegular' }} >PAN Card</label>
                  <Field className="input-field"
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    onChange={formik.handleChange}
                    value={formik.values.panNumber}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.panNumber && formik.errors.panNumber && (
                    <ErrorMsg>{formik.errors.panNumber}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="gender"  style={{ fontFamily:'LatoRegular' }} >Gender</label>
                  <Field className="input-field" as="select" id="gender" name="gender" onChange={formik.handleChange} value={formik.values.gender} style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  {formik.touched.gender && formik.errors.gender && (
                    <ErrorMsg>{formik.errors.gender}</ErrorMsg>
                  )}
                </div>
                {/* <div className="form-control">
                  <label htmlFor="panNumber"  style={{ fontFamily:'LatoRegular' }} >PAN Card</label>
                  <Field className="input-field"
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    onChange={formik.handleChange}
                    value={formik.values.panNumber}
                  />
                  {formik.touched.panNumber && formik.errors.panNumber && (
                    <ErrorMsg>{formik.errors.panNumber}</ErrorMsg>
                  )}
                </div> */}

                <button type="button" className="next-button" onClick={goToNextStep}
                 style={{
                  fontFamily: 'LatoRegular'
                  , borderRadius: '50px',
                  backgroundColor: '#861f41',
                }}
                >
                  Next
                </button>

              </>
            )}
            {step === 2 && (
              <>
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } }   >Personal Details</h2>
                <div className="form-control">
                  <label htmlFor="email"  style={{ fontFamily:'LatoRegular' }} >E-Mail</label>
                  <Field className="input-field"
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <ErrorMsg>{formik.errors.email}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="mobileNumber"  style={{ fontFamily:'LatoRegular' }} >Mobile Number</label>
                  <Field className="input-field"
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    onChange={formik.handleChange}
                    value={formik.values.mobileNumber}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                    <ErrorMsg>{formik.errors.mobileNumber}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="password"  style={{ fontFamily:'LatoRegular' }} >Password</label>
                  <Field className="input-field"
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <ErrorMsg>{formik.errors.password}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="confirmPassword"  style={{ fontFamily:'LatoRegular' }} >confirmPassword</label>
                  <Field className="input-field"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <ErrorMsg>{formik.errors.confirmPassword}</ErrorMsg>
                  )}
                </div>
                <div className="button-container">
                  <button type="button" className="go-back" onClick={goToPreviousStep}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Previous
                  </button>
                  <button type="button" className="go-next" onClick={goToNextStep}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Next
                  </button>
                </div>

              </>
            )}

            {step === 3 && (
              <>
                <div className="confirmation">
                  <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } }  >Confirm</h2>
                  <div className="confirmation-details">
                    
                    <p style={{ fontFamily: 'LatoRegular' }} > First Name : {formik.values.firstName} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > Last Name :  {formik.values.lastName} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > Father Name : {formik.values.fatherName} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > Mother Name :  {formik.values.motherName} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > DOB :  {formik.values.dob} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > Aadhar Number  :  {formik.values.aadharNumber} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > PAN Number :  {formik.values.panNumber} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > Gender :  {formik.values.gender} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > E-mail :  {formik.values.email} </p>
                    <p style={{ fontFamily: 'LatoRegular' }} > Mobile Number :  {formik.values.mobile} </p>
                  </div>
                </div>

                <div className="button-container">
                  <button type="button" className="go-back" onClick={goToPreviousStep}
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Previous
                  </button>
                  <button type="submit" className="go-next"
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Submit
                  </button>
                </div>
              </>

            )}

          </Form>
          <div className='image-container' >
            <img src={register} alt="" className="image" />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Registration;




