import React, { useState } from "react";
import "./signup.css";
import register from "./register1.jpg";
// import axios from "axios";
import Header from "../header/header";
import Footer from "../Footer/footer";

export const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [username, setName] = useState("");
  const [address, setAdd] = useState("");
  const [phone, setPhone] = useState("");

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(email);
  // }
  // async function save(event) {
  //     event.preventDefault();
  //     try {
  //       await axios.post("http://localhost:8081/customer/register", {
  //       username: username,
  //       password: password,
  //       email: email,
  //       address:address,
  //       phone:phone
  //       });
  //       alert("Employee Registation Successfully");

  //     } catch (err) {
  //       alert(err);
  //     }
  //   }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="auth-form-container">
          <h2>Welcome into Apna Bank Register</h2>
          <form className="register-form" onSubmit={" "}>
            <label htmlFor="phone">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="phone"
              placeholder="Phone Number"
              id="phone"
              name="phone"
            />
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
            />
            <label htmlFor="name">Full name</label>
            <input
              value={username}
              name="name"
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="full Name"
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="**"
              id="password"
              name="password"
            />
            <label htmlFor="text">Address</label>
            <input
              value={address}
              onChange={(e) => setAdd(e.target.value)}
              type="text"
              placeholder="Your Address"
              id="address"
              name="addrress"
            />
            <button type="submit">Log In</button>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here.
          </button>
        </div>

        <div className="img">
          <img src={register} className="imgSize" alt="" />{" "}
        </div>
      </div >
      <Footer />
    </div>
  );
};

export default Signup;
