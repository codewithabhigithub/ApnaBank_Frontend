import React from 'react'
import Footer from '../new_components/Footer/footer'

import { Link, redirect } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Cart from '../new_components/cart/cart'
import ImageSlider from '../new_components/Slider/slider'
// import { Slider } from '@material-ui/core';
import Apna from '../new_components/Slider/Apna.jpeg'
import Apnabank from '../new_components/Slider/ApnaBank.jpeg'
import Apna1 from '../new_components/Slider/Apna1.jpeg'
import axi2 from '../new_components/Slider/Apna2.jpeg'
import Apna3 from '../new_components/Slider/Apna3.jpeg'
import Apna4 from '../new_components/Slider/Apna4.jpeg'
import Apna5 from '../new_components/Slider/Apna5.jpeg'
import Whatsapp from '../components/Whatsapp';


function Home(){
  const originalImages = [Apna1,axi2,Apna3,Apna4,Apna5 ];
  const images = Array.from({ length: 5 }, (_, index) => originalImages[index] || '');
 return(
//     <div className="mi">
//         <>
//         <img src="images/ba.avif" alt=".." style={{position: "absolute",
//   top: "60px",right: "10px",  width: "2000px" }}/>
//   <img src="images/l1.webp" alt=".." style={{position: "absolute",
//   top: "100px",right: "10px",  width: "800px" }}/>
//         </>
    
//     <div className='home-container'>
        
            
//       {/* <img src="login.png" alt="Logo4.." className="home-container" style={{position: "absolute",
//   top: "100px",right: "10px",  width: "900px" }}/>    */}
    
//      {/* <img src="login.png" alt="Description of the image"  className="home-container" style={{position: "absolute",
//   top: "100px",right: "10px",  width: "900px" }}/> */}
        
//     {/* <div className='homeText' style={{fontSize:"30px",color:"#AE275F",textAlign:"left",position:"absolute",top:"300px",left:"50px"}}>
//         <h2>Digital Banking</h2>
//         <h4 className='h3'>Open Saving Account...!!</h4>
       
        
//     </div> */}
   
//     {/* <div className='homeButton' style={{top:"590px",right:"1000px",position:"absolute",backgroundColor:"#AE275F",borderradius:"90px"}} >
//         <Link to='registration'> <button className="button" type='button' style={{padding:"15px",color:"#AE275F"}} ><b>Register</b></button></Link>
//     </div> */}

//   {/* // </div> */}
//   <Footer />
// </div>
//  );
// }
<div>
<ImageSlider images={images} />
  <Cart />
  <Whatsapp></Whatsapp>
  <Footer />
</div>)};
export default Home