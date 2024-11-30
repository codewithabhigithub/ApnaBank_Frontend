import React, { useState } from "react";
import './login.css';
import axios from "axios";
import Apna from './Apna.jpeg';
import Header from '../header/header';
import Footer from "../Footer/footer";

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import Carousel from "./Carousel2";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Utility/useAuth";
export const Login = (props) => {
    const [username, setEmail] = useState('');
    const [password, setPass] = useState('');

    //     const auth = useAuth()

    //     // const navigate = useNavigate();

    //     function handleSubmit(e) {
    //         e.preventDefault();

    //         const user = {
    //             username
    //             , password
    //         }

    //         const payload = JSON.stringify(user)
    //         console.log(payload);


    //         axios.post("http://localhost:9191/admin/profile", payload, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then((res) => {
    //             const jwt = res.data;
    //             localStorage.setItem("jwt", jwt);
    //             auth.login(username , password, jwt)
    //             console.log(9);
    //             alert("Admin Login Successfully");

    //         })
    //             .catch((res) => console.log(res));

    //     }

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8081/admin/authenticate", {
                username: username,
                password: password,
            }).then((res) => {
                console.log(res.data);

                if (res.data.message === "Email not exits") {
                    alert("Email not exits");
                }
                else {
                    alert("Incorrect Email and Password not match");
                }
            }, fail => {
                console.error(fail); // Error!
            });
        }

        catch (err) {
            alert(err);
        }

    }

    return (
        <div>
            <Header/>
            {/* <div className="Header">Welcome to Apna Bank</div> */}
            
            <div className="flexbox-container">
                <div className="auth-form-container">
                    <form>
                        <h2> Register/Login</h2>
                        <form className="login-form" onSubmit={" "}>
                            <label htmlFor="text">Email</label>
                            <input value={username} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" id="email" name="email" />
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="****" id="password" name="password" />
                            <button type="submit">Log In</button>
                        </form>
                        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
                    </form>
                </div>
                 
                <div className="img"><img src=  {Apna} className="imgSize" alt="" height="200px"/> </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;