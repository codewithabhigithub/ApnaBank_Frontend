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
    const payload = JSON.stringify(updatedData);
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    // console.log("Token "+jwt+ " Updated Data "+payload)
    axios.put("http://localhost:8888/admin/update/worker", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        alert("update success")
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  };


  useEffect(() => {
    console.log(data); // Logs the updated value of data
  }, [data]);

  return (
    <>
      <div className="employee-container">

        <div className="employee-id-search">
          <h1 style={{ fontFamily: 'LatoBold', fontWeight: 'bold' }} >Enter Username</h1>

          <div className="mobile">
          <input className="find-emmp-input"
            type="text"
            placeholder="Username"
            id="mobileNumber"
            autoComplete="mobileNumber"
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{
              width: '20%',
              padding: ' 5px',
              borderRadius: '10px',
            }}
            />
            </div>

        </div>
        <div className="find" >
          <button className="find-emmp-button" onClick={handleSubmit}
            style={{
              width : '15%',
              fontFamily: 'LatoRegular'
              , borderRadius: '50px',
              backgroundColor: '#861f41',
              alignItems: 'center'
            }}

          >Find</button>
        </div>

      </div>
      <div className="data-container">
        {/* <h2>Data Found:</h2> */}
        {data && (
          <form onSubmit={handleUpdate}>
            {Object.entries(data).map(([field, value]) => {
              if (field === 'address') {
                return null;
              }

              if (field === 'employeeId') {
                return (
                  <div key={field}>
                    <label htmlFor={field}>{field}:</label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={updatedData && updatedData[field] ? updatedData[field] : value}
                      onChange={handleInputChange}
                      disabled // Add the 'disabled' attribute
                    />
                  </div>
                );
              }
              if (field === 'position') {
                return (
                  <div key={field}>
                    <label htmlFor={field}>{field}:</label>
                    <select
                      id={field}
                      name={field}
                      value={updatedData && updatedData[field] ? updatedData[field] : value}
                      onChange={handleInputChange}
                    >
                      <option value="select">select----</option>
                      <option value="EMPLOYEE">EMPLOYEE</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                );
              }
              if (field === 'gender') {
                return (
                  <div key={field}>
                    <label htmlFor={field}>{field}:</label>
                    <select
                      id={field}
                      name={field}
                      value={updatedData && updatedData[field] ? updatedData[field] : value}
                      onChange={handleInputChange}
                    >
                      <option value="select">select----</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                );
              }
              return (
                <div key={field}>
                  <label htmlFor={field}>{field}:</label>
                  <input className="find-emmp-input"
                    type="text"
                    id={field}
                    name={field}
                    value={updatedData && updatedData[field] ? updatedData[field] : value}
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
            <button className="find-emmp-button" type="submit"
             style={{
              fontFamily: 'LatoRegular'
              , borderRadius: '50px',
              backgroundColor: '#861f41',
            }}>Update</button>
          </form>
        )}

      </div>

    </>
  );
}

export default FindEmployee;
