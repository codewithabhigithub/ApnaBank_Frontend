import React from 'react';
import Header from "../header/header";
import emi from '../Images/EMI_Calculator.png'
import EMI from '../emi_calc/emi_calc';
import SimpleEmi from '../emi_calc/simpleEmi';
import './Loan.css'
import Footer from '../Footer/footer';

function Loan() {

    return (

        <div className='first'>
            {/* <Header /> */}
            <div>
                <h1 className='heading' >Apna Bank Loan</h1>
                <p className='para' >At Apna Bank, we believe your journey should continue without any speed bumps. This
                    is why we bring you customized Bank Loans at competitive interest rates. To get started,
                    check your loan eligibility using our simple loan calculators.
                    You can submit your Bank Loan application online in three
                    easy steps and avail the most attractive interest rates and comfortable repayment tenures.</p>

                <h1 className="heading">Apna Bank Home Loans</h1>
                <p className="para">Our affordable and flexible home loans are designed to take you closer to your dream home.
                    Our Home Loan affordability calculator is based on your requirements, such as tenure,
                    loan amount and interest rates to give you an estimate of your EMI.
                    Explore our wide range of products for the most competitive Home Loan interest rates,
                    extended loan tenures and other benefits like EMIs waivers</p>

                <h1 className="heading">Apna Bank Education Loan</h1>
                <p className="para">Apna Bank brings you Education Loans for studies both in India and abroad
                    starting from Rs. 50,000 at attractive interest rates.
                    With an Apna Bank Education Loan you can enjoy a host of benefits such as simple documentation,
                    quick loan disbursal, tax benefit u/s 80(E),
                    long repayment tenure, etc.
                    Find out more about the features and benefits of Student Loan in India, below.</p>
            </div>



            <div className="emi-calculator-container" >
                <div className="emi-calculator-form">
                    <EMI />
                </div>
                <div className="emi-calculator-image" >
                    <img src={emi} />
                </div>
            </div>

            <h1 className="heading">Apna Bank Car Loan</h1>
            <p className="para">Dreaming of owning a car?
                The Apna Bank Car Loan aims to ensures that you drive around the city in your own vehicle!
                Avail a car loan, or opt for a pre-approved car loan, and get the best interest rate.
                Apna Bank’s New Car Loan offers car loans from Rs. 1 Lakh upto 100% on-road price along with benefits.
                Before applying for a car loan online, make sure to use the car loan calculator to find out your EMI.
                Apply for an Apna Bank New Car Loan and make your dream of owning a car come true.</p>

            <h1 className="heading">Apna Bank Personal Loan</h1>
            <p className="para">A Personal Loan can help you meet your urgent needs as well achieve your dreams.
                Apply for Apna Bank Personal Loans and fulfil all your requirements with ease.
                Whether you need money for a foreign trip, a sudden medical emergency or unexpected repairs for your house,
                an Apna Bank Personal Loan is the solution! Enjoy benefits such as fast processing, minimal documentation,
                competitive interest rates and flexible repayment options.
                What’s more, you can also transfer your current high-interest personal loan to Apna Bank and save on interest.</p>


            <div className="emi-calculator-container" >
                <div className="emi-calculator-form">
                    <SimpleEmi />
                </div>
                <div className="emi-calculator-image" >
                    <img src={emi} />
                </div>
            </div>
            {/* <Footer></Footer> */}

        </div>
    )
}
export default Loan;



// import React from 'react';
// import './EMICalculator.css'; // Import CSS file for styling

// const EMICalculator = () => {
//   return (
//     <div className="emi-calculator-container">
//       <div className="emi-calculator-form">
//         {/* Your EMI calculator form goes here */}
//       </div>
//       <div className="emi-calculator-image">
//         <img src="path_to_your_image.png" alt="EMI Calculator" />
//       </div>
//     </div>
//   );
// };

// export default EMICalculator;
