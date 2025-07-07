import React, { useState, useEffect } from 'react';
import './SlideShow.css';
import img1 from '../img/bia_mau-nguoi-cua-cau-la-gi-1.webp';
import img2 from '../img/moockup.webp';
import img3 from '../img/sau_4.webp';

const images = [
  img1, img2, img3
];



function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <button onClick={prevSlide} className="prev">&#10094;</button>

      <div className="slides">
        {images.map((img, idx) => {
            return (
                <img
                key={idx}
                src={img}
                alt={`Slide ${idx + 1}`}
                className={`slide ${
                    idx === currentIndex
                    ? 'active'
                    : idx === (currentIndex + 1) % images.length ||
                        idx === (currentIndex - 1 + images.length) % images.length
                    ? 'nearby'
                    : 'hidden'
                }`}
                />
            );
            })}

      </div>

      <button onClick={nextSlide} className="next">&#10095;</button>
    </div>
  );
}

export default SlideShow;
