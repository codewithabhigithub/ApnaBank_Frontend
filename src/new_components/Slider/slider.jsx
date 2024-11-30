// import React, { useState } from 'react';
import { Margin } from '@mui/icons-material';
import './slider.css';

// 

import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Function to update the active image index
    const updateActiveIndex = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Set the time interval for image transition
    const interval = setInterval(updateActiveIndex, 2000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div >
      {images.map((image, index) => (
        <img className='imagData'
          key={index}
          src={image}
          alt={`Image ${index}`}
          style={{ display: index === activeIndex ? 'block' : 'none', marginTop: "4.5rem",height: "450px", width: "100%"}}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
