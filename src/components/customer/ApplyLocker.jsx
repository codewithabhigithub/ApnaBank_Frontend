import React, { useEffect, useState } from 'react';
import './ApplyLocker.css';
import axios from 'axios';

function LockerApply() {
  const [isChecked, setIsChecked] = useState(false);
  const jwt = localStorage.getItem('jwt')
  const [duration, setDuration] = useState('');
  const [application, setApplication] = useState();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleApplyButtonClick = () => {
    if (application) {
      alert("You have already applied for locker")
      return;
    }
    if (isChecked) {
      if (duration) {
        console.log('Locker application submitted with duration:', duration);
        // Here you can perform any necessary actions with the duration value
      } else {
        alert('Please enter a duration before applying.');
      }
      axios
        .get("http://localhost:8888/lockerCustomer/apply/" + duration, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }).then((res) => {
          console.log(res)
          alert("Applied Successfully");
        }).catch((err) => {
          console.log(err);
          alert(err.response.data);
        })

    } else {
      alert('Please accept the rules and conditions before applying.');
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8888/lockerCustomer/status", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => {
        console.log(res.data)
        setApplication(res.data)
      }).catch((err) => {
        console.log(err);
      })
  }, []);
  const handleStatus = () => {
    if (application.status === 'pending') {
      alert("Your Locker is under verification");
    } else if (application.status === 'approved') {
      alert("Your locker is active")
    } else {
      alert("not found")
    }
  }
  return (
    <div className='customer-locker-apply'>

      {/* <img  src="/images/lo.png" alt="Foreground Image" style={{top:"80px",position:"fixed",right:"100px"}}/> */}

      <div className='customer-locker-rules'>
        <h1 style={{ fontFamily: 'LatoBold' }} >Apply for Locker</h1>
        <div>
          {/* <h2>Rules:</h2>
        <ul>
          <li>Keep the locker key safe.</li>
          <li>Do not share the locker combination with anyone.</li>
          <li>Access the locker during the bank's operating hours only.</li>
        </ul>

        <h2>Conditions:</h2>
        <ul>
          <li>Valid identification and address proof are required to apply.</li>
          <li>Locker rental fees must be paid annually.</li>
          <li>The bank is not responsible for the loss of items stored in the locker.</li>
        </ul> */}

          <div>

            <p className='terms-and-conditions'> <input
              type='checkbox'
              id='rulesCheckbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{ fontFamily: 'LatoRegular', color: 'black' }}
            />
              I accept the rules and conditions for the bank locker.</p>
          </div>
        </div>
        {isChecked && (
          <div>
            <p style={{ fontFamily: 'LatoBold' }} >Duration (in years):
              <input
                type='number'
                id='durationInput'
                placeholder='enter years'
                value={duration}
                onChange={(e) => { setDuration(e.target.value) }}
                style={{
                  backgroundColor: '#FAF3F0',
                  width: '20%',
                  padding: ' 5px',
                  borderRadius: '50px',
                  flex: 1
                }}
              />
            </p>
          </div>
        )

        }

        <button className='locker-status-customer' onClick={handleApplyButtonClick}
          style={{
            width: '15%',
            fontFamily: 'LatoBold'
            , borderRadius: '50px',
            backgroundColor: '#861f41',
            alignItems: 'center'
          }}
        >
          Apply
        </button>
      </div>

      {application && (
        <div >
          <button className='locker-status-customer' onClick={handleStatus}
            style={{
              width: '15%',
              fontFamily: 'LatoBold'
              , borderRadius: '50px',
              backgroundColor: '#861f41',
              alignItems: 'center'
            }}
          >Track Status</button>
        </div>
      )}
    </div>
  );
}

export default LockerApply;
