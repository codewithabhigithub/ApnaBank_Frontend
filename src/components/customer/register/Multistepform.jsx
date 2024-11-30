import { tableBodyClasses } from '@mui/material';
import React, { useState } from 'react';
import "./Multistepform.css";

function Multistepform() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    aadharNumber: '',
    panNumber: '',
    gender: '',

    // Contack Information
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',

    //Address
    Address :{
      houseNo: '',
      street: '',
      locality: '',
      taluka: '',
      district: '',
      state: '',
      country: '',
      pincode: ''
    }

    
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step 1: Personal Information</h2>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            <br />
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            <br />
            <label>Father's Name:</label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange}></input>
            <br></br>
            <label>Mother's Name:</label>
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange}></input>
            <br></br>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange}></input>
            <br></br>
            <label>Aadhar Number</label>
            <input type="number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange}></input>
            <br></br>
            <label>Pan Number:</label>
            <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange}></input>
            <br></br>
            <label>Gender:</label>
<div class="radio-group">
  <label>
    <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
    Male
  </label>
  <label>
    <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
    Female
  </label>
</div>

            <button onClick={() => setStep(2)}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Contact Information</h2>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <br />
            <label>Phone Number:</label>
            <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            <br />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <br />
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            <br />
            <button onClick={() => setStep(1)}>Previous</button>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        );

        case 3:
        return (
          <div>
            <h2>Step 3: Address Information</h2>
            <label>House No:</label>
            <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} />
            <br />
            <label>Street:</label>
            <input type="text" name="street" value={formData.street} onChange={handleChange} />
            <br />
            <label>Locality:</label>
            <input type="text" name="locality" value={formData.locality} onChange={handleChange} />
            <br />
            <label>Taluka:</label>
            <input type="text" name="taluka" value={formData.taluka} onChange={handleChange} />
            <br />
            <label>District:</label>
            <input type="text" name="district" value={formData.district} onChange={handleChange} />
            <br />
            <label>State:</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
            <br />
            <label>Country:</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
            <br />
            <label>Pincode:</label>
            <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} />
            <br />
            <button onClick={() => setStep(2)}>Previous</button>
            <button onClick={() => setStep(4)}>Next</button>
          </div>
        );
        case 4:
  return (
    <div>
      <h2>Step 4: Confirmation</h2>
      <table>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>{formData.firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{formData.lastName}</td>
          </tr>
          <tr>
            <td>Father's Name:</td>
            <td>{formData.fatherName}</td>
          </tr>
          <tr>
            <td>Mother's Name:</td>
            <td>{formData.motherName}</td>
          </tr>
          <tr>
            <td>Date Of Birth:</td>
            <td>{formData.dob}</td>
          </tr>
          <tr>
            <td>Aadhar Number:</td>
            <td>{formData.aadharNumber}</td>
          </tr>
          <tr>
            <td>Pan Number:</td>
            <td>{formData.panNumber}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{formData.gender}</td>
          </tr>
          <tr>
            <td>House No:</td>
            <td>{formData.houseNo}</td>
          </tr>
          <tr>
            <td>Street:</td>
            <td>{formData.street}</td>
          </tr>
          <tr>
            <td>Locality:</td>
            <td>{formData.locality}</td>
          </tr>
          <tr>
            <td>Taluka:</td>
            <td>{formData.taluka}</td>
          </tr>
          <tr>
            <td>District:</td>
            <td>{formData.district}</td>
          </tr>
          <tr>
            <td>State:</td>
            <td>{formData.state}</td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>{formData.country}</td>
          </tr>
          <tr>
            <td>PinCode:</td>
            <td>{formData.pincode}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{formData.email}</td>
          </tr>
          <tr>
            <td>Mobile Number:</td>
            <td>{formData.mobileNumber}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => setStep(3)}>Previous</button>
      <button type="submit">Submit</button>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderForm()}
    </form>
  );
}

export default Multistepform;
