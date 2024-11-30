import React, { useState } from "react";
import "./NavbarStyles.css";
import logo4 from "./logo4.png";
import { useAuth } from "./utility/auth";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";


function Navbar() {
  const [clicked, setClicked] = useState(false);
  const auth = useAuth();
  const nav = useNavigate();
  const jwt=localStorage.getItem('jwt');
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleCoin =() => {
    if(localStorage.getItem("coin")>=10)
    {
      // const amt=localStorage.getItem("coin")/10;
      localStorage.setItem("coin","0");
      nav("#");
    }
    else{
      alert("coin must greater than 100");
      nav("#");
    }
  }

  const handleLogout = () => {
    auth.logout();
    localStorage.clear();
    nav("/");
  };
  const coin=localStorage.getItem("coin");

  const isLoggedIn = false; // Replace with your login status

  return (
    <nav className='mx-2 text-decoration-none' style={{ color: 'white' }} 
    href="#home"><h1 className='Apna1'>Apna Bank</h1>
      
      {/* <a href="index.html">
        <img src={logo4} alt="Logo4" className="logo4" width="50" height="40" />
      </a> */}



      <div className="logo">
        <h2> </h2>
      </div>

      <div>
        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
          <li>
          {!jwt && (
            <a href="/">Home</a>
          )}
          </li>
          
          {/* <li>
            <a href="http://localhost:3002">News Feed</a>
          </li>
          <li>
            <a href="http://localhost:3001">Weather Forcast</a>
          </li> */}
          {/* <li>
          {jwt && (
              <Nav>
                <p>{coin}</p>
              </Nav>
            )}
          </li> */}
          <li>
          {!jwt && (
            <a href="about">About</a>
          )}
          {/* {jwt && (
              <Nav>
                 <Link className="text-decoration-none mx-2"
                  onClick={handleCoin}
                >
                  Redeem
                </Link>
              </Nav>
          )} */}
          </li>
          <li>           
            {!jwt && (
                <Nav>
                     <Link className="text-decoration-none mx-2" to="login"> Login</Link>       
                </Nav>
            )}
            {jwt && (
              <Nav>
                <Link className="text-decoration-none mx-2" to='login'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </Nav>
            )}
            
          </li>
          <li>
          {!jwt && (
            <Link to='registration'> Register</Link>
          )}
          </li>
          {/* <li className='homeButton' >
        <Link to='registration'> Register</Link>
</li> */}
        </ul>
      </div>

      <div id="mobile" onClick={handleClick}>
        <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
  );
};

export default Navbar;









// import { Component } from "react";
// import "./NavbarStyles.css"
// import logo from "./logo.png"
// import logo2 from "./logo2.png"
// import logo3 from "./logo3.png"
// import logo4 from "./logo4.png"

// class Navbar extends Component {

//     state= {clicked : false};
//     handleclick = () => {

//         this.setState({clicked : !this.state.clicked})
//     }

//     render(){
//     return(
//         <nav>
//             <a href="index.html">
                
//             {/* <svg  id="logo-85" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="ccustom" fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z" fill="#c2053e" stop-color="#c2053e"></path></svg> */}
//             <img src={logo4} alt="Logo4" className="logo4" width="50" height="40"/>
//             </a>
           
//             <div className="logo">
//                 <h2 >Bank</h2>
//             </div>
//         {/* <a href="index.html" className="logo-link"> 
//           <img src={logo} alt="Logo" className="logo" /> 
//         </a> */}
            

//             <div>

//                 <ul id="navbar" className={this.state.clicked? 
//                 "#navbar active" : "#navbar"}>
//                      <li> <a  href="index.html"> Home</a></li>

//                      <li> <a href="index.html"> About </a></li>
//                      <li> <a href="/login"> Login</a></li>
//                 </ul>
//             </div>

//             <div id="mobile" onClick={this.handleclick}>

//                 <i id="bar"
//                 className={this.state.clicked ?
//                 'fas fa-times' : 'fas fa-bars'}></i>
//             </div>



//         </nav>

//     );
//                 }
// }

// export default Navbar;
