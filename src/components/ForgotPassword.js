import React, { useState } from 'react';
import './customer/register/Registration.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
// import ErrorMsg from './components/customer/register/ErrorMsg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from './customer/register/ErrorMsg';
// import register from './components/register/register1.jpg'

const initialValues = {
  mobileNumber: '',
  password: '',
  confirmPassword: '',


};
const passwordStrong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
const validationSchema = Yup.object({
  mobileNumber: Yup.string().required('Mobile Number is required').matches(/^\d+$/, 'Mobile Number should contain only digits').length(10, 'Mobile Number should be exactly 10 digits'),
  password: Yup.string().required('Password is required').matches(passwordStrong,"Please enter a strong password atleast 1 capital letter, 1 special letter"),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

const ForgotPassword = () => {
  const [formValues, setFormValues] = useState(initialValues); // Form values state
  const nav = useNavigate();

  const handleSubmit = (values) => {
    const payload = JSON.stringify(values);
    localStorage.setItem("mobileNumber",values.mobileNumber);
    localStorage.setItem("password",values.password);
    axios
      .post("http://localhost:8888/otp"+"/"+values.mobileNumber, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if ((res.request.status == 200)) {
            localStorage.setItem("otp", res.data);
            alert("OTP send Successfully");
            nav(`/login/otp`);

        }
      }).catch((err) => {
        console.log(err);
        alert("Failed Try Again");
      })

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
          
          <Form className="container" style={{ marginTop: '4rem' ,backgroundColor : 'black' }}  >
              <>
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Password Update Details</h2>
                  
                
                <div className="form-control">
                  <label htmlFor="mobileNumber"  style={{ fontFamily:'LatoRegular' }} >User Name:</label>
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
                  <label htmlFor="password"  style={{ fontFamily:'LatoRegular' }} >New Password:</label>
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
                  <label htmlFor="confirmPassword"  style={{ fontFamily:'LatoRegular' }} >Confirm Password:</label>
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
                 <div>
                  <button type="submit" className="go-next"
                   style={{
                    fontFamily: 'LatoRegular'
                    , borderRadius: '50px',
                    backgroundColor: '#861f41',
                  }}
                  >
                    Send OTP
                  </button>
                </div>
              </>
              </Form>
              </div>
      )}
    </Formik>
  );
};

export default ForgotPassword;




