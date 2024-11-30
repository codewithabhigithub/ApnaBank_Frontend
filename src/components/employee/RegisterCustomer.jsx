import React, { useState } from 'react';
import './RegisterCustomer.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorMsg from '../customer/register/ErrorMsg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utility/auth';

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
  accountType: '',
  address:{
    houseNo: '',
    street: '',
    locality: '',
    taluka: '',
    district: '',
    state: '',
    country: '',
    pincode: ''
}


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
  accountType: Yup.string().required('Accout type is required'),
//   address: Yup.string().required('Pincode is required'),

});

function RegistrationCustomer  ()  {
  const [step, setStep] = useState(1); // Current step of the form
  const [formValues, setFormValues] = useState(initialValues); // Form values state
  const nav=useNavigate();
  const auth=useAuth();
  const handleSubmit = (values) => {
    const payload = JSON.stringify(values);
    console.log("hi")
    console.log(values);
   
    const jwt=localStorage.getItem("jwt");
    
    axios
          .post("http://localhost:8888/employee/register/customer", payload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }).then((res)=>{
            console.log(res);
            if((res.status==201)){
              alert("Submited Successfully");
              console.log("DATA "+res.data)
              // nav('/admin')
            }
          }).catch((err)=>{
            console.log(err);
            alert("mobile number already registred")
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
          <Form className="container" style={{ marginTop: '4rem' }}>
            {step === 1 && (
              <>
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } }>Personal Details</h2>
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
                  <label htmlFor="lastName"style={{ fontFamily:'LatoRegular' }}>Last Name</label>
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
                  <label htmlFor="gender"style={{ fontFamily:'LatoRegular' }}>Gender</label>
                  <Field className="input-field" as="select" id="gender" name="gender" onChange={formik.handleChange} value={formik.values.gender}
                  style={{ backgroundColor:'#FAF3F0', width: '60%',
                  padding:' 5px',
                  borderRadius: '50px',
                  flex : 1
                }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  {formik.touched.gender && formik.errors.gender && (
                    <ErrorMsg>{formik.errors.gender}</ErrorMsg>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="fatherName"style={{ fontFamily:'LatoRegular' }}>Father Name</label>
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
                  <label htmlFor="motherName"style={{ fontFamily:'LatoRegular' }}>Mother Name</label>
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
                  <label htmlFor="dob"style={{ fontFamily:'LatoRegular' }}>DOB</label>
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
                  <label htmlFor="aadharNumber"style={{ fontFamily:'LatoRegular' }}>Adhar Card</label>
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
                  <label htmlFor="panNumber"style={{ fontFamily:'LatoRegular' }}>PAN Card</label>
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
                  <label htmlFor="accountType"style={{ fontFamily:'LatoRegular' }}>accountType</label>
                  <Field className="input-field" as="select" id="accountType" name="accountType" onChange={formik.handleChange} value={formik.values.accountType}
                  style={{ backgroundColor:'#FAF3F0', width: '60%',
                  padding:' 5px',
                  borderRadius: '50px',
                  flex : 1
                }}
                  >
                    <option value="">Select accountType</option>
                    <option value="savings">Saving</option>
                    <option value="current">Current</option>
                  </Field>
                  {formik.touched.accountType && formik.errors.accountType && (
                    <ErrorMsg>{formik.errors.accountType}</ErrorMsg>
                  )}
                </div>
                
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
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Contact Details</h2>
                <div className="form-control">
                  <label htmlFor="email"style={{ fontFamily:'LatoRegular' }}>E-Mail</label>
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
                  <label htmlFor="mobileNumber"style={{ fontFamily:'LatoRegular' }}>Mobile Number</label>
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
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Address</h2>
                <div className='form-control'>
                        <label htmlFor="houseNo"style={{ fontFamily:'LatoRegular' }}>House Number</label>
                        <Field  className="input-field"
                        type="number" 
                        id="houseNo" 
                        name="address.houseNo" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="street"style={{ fontFamily:'LatoRegular' }}>Street</label>
                        <Field  className="input-field"
                        type="text" 
                        id="street" 
                        name="address.street" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="locality"style={{ fontFamily:'LatoRegular' }}>Locality</label>
                        <Field  className="input-field"
                        type="text" 
                        id="locality" 
                        name="address.locality" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="taluka"style={{ fontFamily:'LatoRegular' }}>Taluk</label>
                        <Field  className="input-field"
                        type="text" 
                        id="taluka" 
                        name="address.taluka" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="district"style={{ fontFamily:'LatoRegular' }}>District</label>
                        <Field  className="input-field"
                        type="text" 
                        id="district" 
                        name="address.district" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="state"style={{ fontFamily:'LatoRegular' }}>State</label>
                        <Field  className="input-field"
                        type="text" 
                        id="state" 
                        name="address.state" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="country"style={{ fontFamily:'LatoRegular' }}>Country</label>
                        <Field  className="input-field"
                        type="text" 
                        id="country" 
                        name="address.country" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
                   </div>
                   <div className='form-control'>
                        <label htmlFor="pincode"style={{ fontFamily:'LatoRegular' }}>PIN Code</label>
                        <Field  className="input-field"
                        type="number" 
                        id="pincode" 
                        name="address.pincode" 
                        style={{ backgroundColor:'#FAF3F0', width: '60%',
                    padding:' 5px',
                    borderRadius: '50px',
                    flex : 1
                  }}
                        />
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
            {step === 4 && (
              <>
                <div className="confirmation">
                  <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Confirmation</h2>
                  <div className="confirmation-details">
                    <p>
                      <strong>First Name</strong> {formik.values.firstName}
                    </p>
                    <p>
                      <strong>Last Name</strong> {formik.values.lastName}
                    </p>
                
                    <p>
                      <strong>Father Name:</strong> {formik.values.fatherName}
                    </p>
                    <p>
                      <strong>Mother Name:</strong> {formik.values.motherName}
                    </p>
                    <p>
                      <strong>Gender </strong> {formik.values.gender}
                    </p>
                    <p>
                      <strong>Date Of Birth </strong> {formik.values.dob}
                    </p>
                    <p>
                      <strong>E-Mail</strong> {formik.values.email}
                    </p>
                    <p>
                      <strong>Mobile Number</strong> {formik.values.mobileNumber}
                    </p>
                    <p>
                      <strong>Account Type </strong> {formik.values.accountType} {/* Use formValues.address.state instead of initialValues.address.state */}
                   </p>
                   <p>
                      <strong>Aadhar Number </strong> {formik.values.aadharNumber} {/* Use formValues.address.state instead of initialValues.address.state */}
                   </p>
                   <p>
                      <strong>PAN Number </strong> {formik.values.panNumber} {/* Use formValues.address.state instead of initialValues.address.state */}
                   </p>
                   <p>
                      <strong>House Number </strong> {formik.values.address.houseNo} {/* Use formValues.address.state instead of initialValues.address.state */}
                   </p>
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
        </div>
      )}
    </Formik>
  );
};

export default RegistrationCustomer;