import React from 'react'
import Footer from '../new_components/Footer/footer'

function About() {
  return (
    <>
     
   <img src="./images/about_img.jpg" alt =" "/>
   <div class="bannerText" style={{ position: 'absolute', top: '50%',left: '35%', width: '100%'}}><div class="container" style={{ paddingright: '15px',
    paddingleft: '65px',
    marginright: 'auto',
    marginleft: '15rem'}}><div class="row" style={{marginleft: '15rem'}}><div class="col-md-12" style={{position: 'relative',
        minheight: '1px',
        paddingright: '15px',
        paddingleft:'65px', margin: '0',
        padding:'0',
        border:' 0'}}><h2 style={{fontweight: '1000', color: '', textAlign: 'center'}}>We’re just the bank you need. </h2></div></div></div></div>
   <div>
    <br/>
    <br/>
    <br/>
    
        <h5  style={{ fontSize: '30px',fontFamily: ' Lato-Light', padding: '3rem 0 2rem',  marginLeft: '100px' }}>About Us</h5>
        <div  style={{ marginLeft: '100px' }}>
          <br/>
          <br/>
          <br/>
          <h3 style={{ fontFamily: 'Verdana, sans-serif' ,top:"3000px", bottom:"400px"}}>Our <strong>Corporate Office</strong></h3>
          <p style={{ bottom:"20px", fontSize: '13px', width: '36rem', addingRight: '1rem' }}>
            Apna Bank Limited, Corporate Office, 
            <br />
            <span >Bombay Dyeing Mills Compound,</span>
            <br />
            <span>Pandurang Budhkar Marg, Worli,</span>
            <br />
            Mumbai - 400 025
            <br />
            <div>
              <br/>
            <p >Tel: (022) 2425 2525</p>
            <p style={{ fontSize: '15px' }}>CIN: L65110GJ1993PLC020769</p>
            </div>
          </p>
          
        </div>
        
      </div>
      <br/>
      <br/>
      <br/>
      <div style={{ position: 'relative', height: '100%' }}>
        <div style={{ position: 'absolute', bottom: '0',  right: '0', textAlign: 'center' }}>
          <img
            src="images/img_ouroffice.jpg"
            alt="About Image"
            style={{ display: 'inline-block', verticalAlign: 'middle', transform: 'translateX(-200px)' }}
          />
        </div>
        </div>
        {/* <div className="data" style={{ display: "flex", justifyContent: "space-between" ,  padding: "30px",style:"width: 100%"}}>
  <div class="card" style={{ width: "8000rem",height:"14rem", margin: "0 5px" ,right:"580px"}}>
    <img className="img" class="card-img-top" src="./images/amitabh-chaudhary.jpg" alt="Card image cap" />

    
    <div class="card-body">
      <p class="card-text" style={{width:"100px", color:"#AE275F"}}><strong>CreditCard</strong></p>
    </div>
  </div>

  <div class="card" style={{ width: "8000rem",height:"14rem", margin: "0 5px",right:"520px" }}>
    <img className="img" class="card-img-top" src="./images/loan-icon.png" alt="Card image cap" />
    <div class="card-body">
      <p class="card-text" style={{width:"1000px", color:"#AE275F"}}><strong>Personal Loan</strong></p>
    </div>
  </div>

  <div class="card" style={{ width: "8000rem",height:"14rem", margin: "0 5px",right:"450px" }}>
    <img className="img" class="card-img-top" src="./images/amitabh-chaudhary.jpg" alt="Card image cap" />
    <div class="card-body">
      <p class="card-text" style={{width:"1000px", color:"#AE275F"}} ><strong>Abmitabh Chaudhary</strong></p>
      <p>Managing Director & Cheif Executive Officer </p>
      
    </div>
  </div>
  <div class="card" style={{ width: "8000rem",height:"14rem", margin: "0 5px",right:"380px" }}>
    <img className="img" class="card-img-top" src="./images/img_bod_10.jpg" alt="Card image cap" />
    <div class="card-body">
      <p class="card-text" style={{width:"1000px", color:"#AE275F"}} ><strong>Rakesh Makhija</strong></p>
      <p>Independent Director & Non Executive (Part time) Chairman - Apna Bank</p>
    </div>
  </div>
  <div class="card" style={{ width: "8000rem",height:"14rem", margin: "0 5px" ,right:"300px"}}>
    <img className="img" class="card-img-top" src="./images/img_bod_11.jpg" alt="Card image cap" />
    <div class="card-body">
      <p class="card-text" style={{width:"1000px", color:"#AE275F"}} ><strong>Ketaki Bhagwati</strong></p>
      <p>Independent Director</p>
    </div>
  </div>"
  <div class="card" style={{ width: "8000rem",height:"14rem", margin: "0 5px" ,right:"200px"}}>
    <img className="img" class="card-img-top" src="./images/neeraj-gambhir.jpg" alt="Card image cap" />
    
    <div class="card-body">
      <p class="card-text" style={{width:"1000px", color:"#AE275F"}} ><strong>Girish Paranjpe</strong></p>
      <p>Independent Director</p>
     

    </div>
   
  </div>  */}

{/* </div>  */}
      
        
            {/* <footer>
      <div className="about-info">
        <h3>About Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et suscipit neque, vel condimentum sapien. Nulla facilisi. Suspendisse eget velit at arcu scelerisque ultrices.</p>
      </div>
      <div className="social-media">
        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer> */}
             <Footer />
        </>
  )
}

export default About