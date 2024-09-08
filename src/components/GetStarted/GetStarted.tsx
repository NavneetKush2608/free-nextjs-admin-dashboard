"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import slide1 from './slide1.svg';
import slide2 from './slide2.svg';
import slide3 from './slide3.svg';

const GetStarted: React.FC = () => {
  const texts = [
    {
      heading: "Breath Better",
      description: "Monitor air quality for healthier living."
    },
    {
      heading: "Track Pollution",
      description: "Stay informed about air pollution levels."
    },
    {
      heading: "Control Exposure",
      description: "Manage your exposure to harmful pollutants."
    },
    {
      heading: "Clean Air Matters",
      description: "Take action for cleaner, safer air."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setIsTransitioning(false);
    }, 300);
  };

  const slides = [slide1, slide2, slide3];

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFEFE] relative">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center p-4 sm:p-10 bg-white">
        {/* Logo */}
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-3xl sm:text-2xl font-extrabold text-gray-800">Air</span>
          <span className="text-3xl sm:text-2xl font-extrabold text-green-600">Watch</span>
        </div>

        {/* Search */}
        <div className="w-full sm:w-auto sm:flex-grow mx-0 sm:mx-4 mb-4 sm:mb-0">
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm sm:text-base text-gray-700 bg-white rounded-full focus:outline-none border-2 border-green-500 pr-8 sm:pr-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Sign up / Sign in - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:flex items-center space-x-4">
          <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
            Sign Up
          </button>
          <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300">
            Sign In
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto mt-4 sm:mt-8 px-4 sm:px-0">
        {/* Mobile Slider */}
        <div className="md:hidden w-full mb-6 sm:mb-8 overflow-hidden rounded-lg">
          <div className="relative w-full h-64">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image src={slide} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Combined Image */}
        <div className="hidden md:block mb-6 sm:mb-8 overflow-hidden rounded-lg">
          <div className="flex justify-center items-center">
            <div>
              <Image src={slide1} alt="Slide 1" className="max-w-full h-auto" />
            </div>
            <div>
              <Image src={slide2} alt="Slide 2" className="max-w-full h-auto" />
            </div>
            <div>
              <Image src={slide3} alt="Slide 3" className="max-w-full h-auto" />
            </div>
          </div>
        </div>

        <div className="text-center relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-2 sm:px-4">
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-green-700 transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {texts[currentIndex].heading}
          </h2>
          <p className={`text-base sm:text-lg md:text-xl text-black mb-16 sm:mb-8 transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {texts[currentIndex].description}
          </p>
          <div className="flex justify-between items-center absolute w-full left-0 top-1/2 transform -translate-y-1/2 px-2 sm:px-4">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none shadow-md"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none shadow-md"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {/* Indicators */}
        <div className="flex justify-center mt-4 space-x-2 mb-4">
          {texts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-green-500 scale-125' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        {/* Sign up / Sign in - Visible only on mobile */}
        <div className="flex sm:hidden items-center space-x-4 mt-6">
          <button className="px-3 py-1 text-sm text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
            Sign Up
          </button>
          <button className="px-3 py-1 text-sm text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
