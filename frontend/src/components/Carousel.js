import React, { useRef, useState } from 'react';
import '../stylesheets/Carousel.css';

import img1 from '../assets/images/mypic1.png';
import img2 from '../assets/images/car-pic.jpg';
import img3 from '../assets/images/mypic3.jpg';
import img4 from '../assets/images/mypic4.jpg';
import img5 from '../assets/images/mypic5.jpg';

const slides = [
  {
    image: img1,
    // location: 'Maui, Hawaii',
  },
  {
    image: img2,
    // location: 'Lanzarote, Spanien',
  },
  {
    image: img3,
    // location: 'Paris, France',
  },
  {
    image: img4,
    // location: 'The Yucatan, Mexico',
  },
  {
    image: img5,
    // location: 'Whitsunday Islands, Australia',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle index
  const totalSlides = slides.length;
  const startX = useRef(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    const diff = e.clientX - startX.current;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
  };

  // Calculate the order of slides based on currentIndex
  const getSlideOrder = (index) => {
    const diff = index - currentIndex;
    if (diff < -Math.floor(totalSlides / 2)) {
      return diff + totalSlides;
    } else if (diff > Math.floor(totalSlides / 2)) {
      return diff - totalSlides;
    }
    return diff;
  };

  return (
    <div
      className="react-swiper"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="react-swiper-wrapper">
        {slides.map((slide, idx) => {
          const order = getSlideOrder(idx);
          const absOrder = Math.abs(order);

          let className = 'react-swiper-slide';
          if (order === 0) className += ' active';
          else if (absOrder === 1) className += ' adjacent';
          else className += ' hidden';

          return (
            <div
              className={className}
              key={idx}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                order: order + Math.floor(totalSlides / 2),
              }}
            >
              <div className="slide-content">
                <p className="location-text">
                  {/* <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="location-icon"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg> */}
                  {slide.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="carousel-controls">
        <button className="carousel-btn prev" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button className="carousel-btn next" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="react-swiper-pagination">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`swiper-pagination-bullet${idx === currentIndex ? ' swiper-pagination-bullet-active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;