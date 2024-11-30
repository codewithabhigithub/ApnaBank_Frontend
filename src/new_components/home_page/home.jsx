import React from 'react';
import './home.css';
import Header from '../header/header';
import Footer from '../Footer/footer';
import Cart from '../cart/cart';
import Apna from '../Slider/Apna.jpeg'
import Apna1 from '../Slider/Apna1.jpeg'
import axi2 from '../Slider/Apna2.jpeg'
import Apna3 from '../Slider/Apna3.jpeg'
import Apnabank from '../Slider/ApnaBank.jpeg'

import ImageSlider from '../Slider/slider';

function Home(){
 
    const originalImages = [ Apna,Apnabank ,Apna1,axi2,Apna3 ];
    const images = Array.from({ length: 5 }, (_, index) => originalImages[index] || '');
  

    return (
        <div>
            <Header/>

            <ImageSlider images={images} />

            <Cart/>

            <Footer/>

        </div>
    )
}
export default Home;