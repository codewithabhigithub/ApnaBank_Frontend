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


};
const passwordStrong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
const validationSchema = Yup.object({
  mobileNumber: Yup.string().required('OTP is required').matches(/^\d+$/, 'Mobile Number should contain only digits').length(4, 'OTP should be exactly 4 digits'),


});

const Otp = () => {
  const [formValues, setFormValues] = useState(initialValues); // Form values state
  const nav = useNavigate();

  const handleSubmit = (values) => {
    const payload = JSON.stringify(values);
    console.log(values.confirmPassword);
    console.log(localStorage.getItem("otp"));
    if(localStorage.getItem("otp")===values.mobileNumber)
    {
    axios
      .post("http://localhost:8888/forgot"+"/"+localStorage.getItem("mobileNumber")+"/"+localStorage.getItem("password"), {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if ((res.request.status == 200)) {
            alert("Password update successfully")
            nav("/")
        }
      }).catch((err) => {
        console.log(err);
        alert("Failed Try Again");
        nav("/login/otp")
      })
    }
    else{
        alert("OTP not matched")
        nav("/login/otp")
    }

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
                <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >OTP Details</h2>
                  
                
                <div className="form-control">
                  <label htmlFor="mobileNumber"  style={{ fontFamily:'LatoRegular' }} >Enter OTP:</label>
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
                 <div>
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
              </Form>
              </div>
      )}
    </Formik>
  );
};

export default Otp;




