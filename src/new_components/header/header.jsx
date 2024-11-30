
import React from 'react';
import './header.css';

function Header(){
    return(
        <div className="Header">
            {/* <div>
                <span>Apna Bank</span>
                <span>Dil Se Open</span>
            </div> */}
            {/* <h1>Apna Bank</h1> */}
           <div className="Apna" >   Apna Bank  <span className='Dil'> Dil se Open</span>   </div>
            <div>
            <ul id="navbar" className={" "}>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="about">About</a>
            </li>
            <li>
                <a href="about">Login</a>
            </li>
            <li>
                <a href="about">Register</a>
            </li>
            {/* <li>           
                <Nav>
                    <Link className="text-decoration-none mx-2" to="login"> Login</Link>       
                </Nav>

                <Nav>
                <Link className="text-decoration-none mx-2" to='login'onClick={" "}>
                Logout
                </Link>
            </Nav>
            </li> */}
            </ul>
            </div>
        </div>
    );
}

export default Header;