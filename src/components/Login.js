import React, { useState } from "react";
import { useAuth } from "./utility/auth";
import { useLocation, useNavigate } from "react-router";
import './Login.css'
import Apna from '../new_components/Slider/Apna.jpeg'
import Header from '../new_components/header/header'
import Footer from '../new_components/Footer/footer'


import axios from 'axios';
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

export const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const maxLoginAttempts = 3;
  const lockoutTimeInMs = 60000;
  const [isInputReadOnly, setInputReadOnly] = useState(false);

  const makeInputReadOnly = () => {
    setInputReadOnly(true);
  };

  const makeInputEditable = () => {
    setInputReadOnly(false);
  };


  const auth = useAuth();

  const nav = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const handleSubmit = (e) => {
    if (!isCaptchaVerified) {
      alert('Please verify the reCAPTCHA.');
      return;
    }
    e.preventDefault();
    console.log('in login')
    console.log(username)
    const user = {
      username: username,
      password: password,
    };
    console.log(user);
    const payload = JSON.stringify(user);

    axios
      .post("http://localhost:8888/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const jwt = res.data.jwt;
        console.log(res)
        console.log("token " + jwt)
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("coin", "10");
        setLoginAttempts(0);
        setUsername('');
        setPassword('');
        alert('Login successful!');
        auth.login(username, password, jwt);

        if (res.data.role === "ROLE_ADMIN") {
          nav('/admin')
        } else if (res.data.role === "ROLE_MANAGER") {
          nav('/manager')
        } else if (res.data.role === "ROLE_EMPLOYEE") {
          nav('/employee')
        } else if (res.data.role === "ROLE_CUSTOMER") {
          nav('/customer')
        } else {
          nav('/random')
        }
        // nav('/admin')
        // nav(redirectPath, { replace: true });

      })
      .catch((res) => {
        setLoginAttempts((prevAttempts) => prevAttempts + 1);
        if (loginAttempts >= maxLoginAttempts - 1) {
          alert(`You have reached the maximum number of login attempts. Your account will be locked for ${lockoutTimeInMs / 1000} seconds.`);
          makeInputReadOnly();
          setIsCaptchaVerified(false);
          setUsername('');
          setPassword('');


          setTimeout(() => {
            setLoginAttempts(0);
            setIsCaptchaVerified(true);
            makeInputEditable();
          }, lockoutTimeInMs);
        } else {
          alert('Invalid username or password. Please try again.');
        }

      });


  };

  const handleCaptchaChange = (value) => {
    setIsCaptchaVerified(!!value);
  };
  const handleResetCaptcha = () => {
    setIsCaptchaVerified(false);
  };

  return (
    <div className='login-cotainer-myLogin' >
      <div className="box-myLogin">
        <div className="container-myLogin">
          <div className="top-myLogin">

          </div>
          <br></br>
          <form onSubmit={handleSubmit}>


            <div className="input-field-myLogin" >
              <input type="text" class="input-myLogin" readOnly={isInputReadOnly} style={{ left: "30px", top: "300px", width: "300px" }} placeholder="Mail/Mobile No" id="username" name="username"
                autoComplete="username"
                onChange={e => setUsername(e.target.value)}
              />
              <div className="img" >
                {/* <img src="images/b.jpg" alt=".." style={{
  top: "10px",  width: "1300px"  }}/>   */}
                <img src="images/login.png" alt=".." style={{
                  position: "absolute",
                  top: "100px", right: "10px", width: "800px"
                }} />
                {/* <img src="images/fi.png" alt=".." style={{position:"fixed",right:"100px",
  top: "100px",  width: "1000px" }}/> */}
              </div>
              <i class='bx bx-user' ></i>
            </div>
            <br />
            <div className="input-field-myLogin" >
              <input type="Password" className="input-myLogin" readOnly={isInputReadOnly} style={{ left: "30px", position: "absolute", top: "400px", width: "300px" }} placeholder="Password" id="password" name="password"
                autoComplete="password"
                onChange={e => setPassword(e.target.value)}
              />
              <i className='bx bx-lock-alt-myLogin'></i>
            </div>
            <br />
            <div className="data" style={{ left: "30px", position: "absolute", top: "500px" }}>
              <lebel> <ReCAPTCHA sitekey="6LeByD4nAAAAAFjHv-iHMwKWv00YmRR4WSCSWzlU" readOnly={isInputReadOnly} onChange={handleCaptchaChange} /></lebel></div>

            <div className="input-field-myLogin">
              <input type="submit" className="submit-myLogin" readOnly={isInputReadOnly} value="Login" id="submit" />
              {/* <button class="submit" onClick={handleSubmit}>Login</button> */}


            </div>
            <div className="input-field-myLogin">
              {/* <button class="submit" onClick={handleSubmit}>Login</button> */}
              <label><Link to="ForgotPassword" readOnly={isInputReadOnly} className="submit-myLogi" align="center" style={{ textDecoration: 'none', color: 'white' }}>Forgot?</Link></label>

            </div>




          </form>

        </div>
      </div>
      <Footer />
    </div>

  );
}
export default Login;