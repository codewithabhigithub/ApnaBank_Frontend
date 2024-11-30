import React, { useEffect, useState } from "react";
import './FindEmployee.css'
import axios from "axios";

function DeleteWorker() {
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
        if (err.response && err.response.status === 404) {
          alert("Not found");
        }
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
    console.log(updatedData.employeeId)
    axios
      .delete("http://localhost:8888/admin/delete/manager/" + updatedData.employeeId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        setData(null);
        if (err.response && err.response.status === 404) {
          alert("Not found");
        }
      });

  };


  useEffect(() => {
    console.log(data); // Logs the updated value of data
  }, [data]);

  return (
    <>
      <div className="employee-container">

        <div className="employee-id-search">
          <h1 style={{ fontFamily: 'LatoBold' }}>Enter Username</h1>

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
        <div>

          <div className="find">
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

      </div>
      <div className="data-container">
        {/* <h2>Data</h2> */}
        {data && (
          <form onSubmit={handleUpdate}>
            {Object.entries(data).map(([field, value]) => {
              if (field === 'address' || field === 'ifsc' || field === 'branchCode' || field === 'panNumber' || field === 'dob' || field === 'motherName' || field === 'fatherName' || field === 'gender') {
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

              return (
                <div key={field}>
                  <label htmlFor={field}>{field}:</label>
                  <input className="find-emmp-input"
                    type="text"
                    id={field}
                    name={field}
                    value={updatedData && updatedData[field] ? updatedData[field] : value}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              );
            })}
            <button className="find-emmp-button" type="submit"
             style={{
              fontFamily: 'LatoRegular'
              , borderRadius: '50px',
              backgroundColor: '#861f41',
            }}
            >Delete</button>
          </form>
        )}

      </div>

    </>
  );
}

export default DeleteWorker;
