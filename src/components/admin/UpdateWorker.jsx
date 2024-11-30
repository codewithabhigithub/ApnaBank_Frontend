import React, { useEffect, useState } from "react";
import './FindEmployee.css'
import axios from "axios";
function FindEmployee() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");

    axios.get("http://localhost:8888/admin/find/worker/" + mobileNumber, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        setData(res.data);
        setUpdatedData(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    console.log(updatedData)
    // axios.post("http://localhost:8888/admin/update/worker", updatedData, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     // Handle successful update
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // Handle error
    //   });
  };


  useEffect(() => {
    console.log(data); // Logs the updated value of data
  }, [data]);

  return (
    <>
      <>
        <div className="employee-container">

          <form>
            <div className="employee-id-search">
              <h1 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Enter Mobile Number</h1>
              <input className="find-emmp-input"
                type="text"
                placeholder="Mobile_Number"
                id="mobileNumber"
                autoComplete="mobileNumber"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div>
              <button className="find-emm p-button" onClick={handleSubmit}>Find</button>
            </div>
          </form>
        </div>
        <div className="employee-container">
          {data && (
            <form action="">
              <div>
                <label htmlFor="firstName" style={ { fontFamily : 'LatoRegular' } } >First Name</label>
                <input type="text" name="firstName" id="firstName" value={data.firstName} required />
              </div>
              <div>
                <label htmlFor="lastName"style={ { fontFamily : 'LatoRegular' } }>Last Name</label>
                <input type="text" name="lastName" id="lastName" value={data.lastName} required />
              </div>
              <div>
                <label htmlFor="email" style={ { fontFamily : 'LatoRegular' } } >E-Mail</label>
                <input type="email" name="email" id="email" value={data.email} required />
              </div>
              
              <select name="position" id="position" onChange={handleInputChange} required>
                <option value="employee" selected={data.position === "employee"}>
                  Employee
                </option>
                <option value="manager" selected={data.position === "manager"}>
                  Manager
                </option>
                <option value="admin" selected={data.position === "admin"}>
                  Admin
                </option>
              </select>

              <div>
                <label htmlFor="dob" style={ { fontFamily : 'LatoRegular' } } >DOB</label>
                <input type="date" name="dob" id="dob" value={data.dob} required />
              </div>
              <div>
                <label htmlFor="aadharNumber" style={ { fontFamily : 'LatoRegular' } } >Aadhar Number</label>
                <input type="number" name="aadharNumber" id="aadharNumber" value={data.aadharNumber} required />
              </div>
              <div>
                <label htmlFor="panNumber" style={ { fontFamily : 'LatoRegular' } } >PAN Number</label>
                <input type="text" name="panNumber" id="panNumber" value={data.panNumber} required />
              </div>
              <div>
                <label htmlFor="branchName" style={ { fontFamily : 'LatoRegular' } } >Branch Name</label>
                <input type="text" name="branchName" id="branchName" value={data.branchName} required />
              </div>
              <div>
                <label htmlFor="branchCode" style={ { fontFamily : 'LatoRegular' } } >Branch Code</label>
                <input type="text" name="branchCode" id="branchCode" value={data.branchCode} required />
              </div>
              <div>
                <label htmlFor="ifsc" style={ { fontFamily : 'LatoRegular' } } >IFSC Code</label>
                <input type="text" name="ifsc" id="ifsc" value={data.ifsc} required />
              </div>
            </form>
          )}
        </div>

      </>

    </>
  );
}

export default FindEmployee;
