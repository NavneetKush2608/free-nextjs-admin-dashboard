"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import slide1 from './slide1.svg';
import slide2 from './slide2.svg';
import slide3 from './slide3.svg';
import { useRouter } from 'next/navigation';
import { useLocation } from '../contexts/LocationContext';
import axios from 'axios';

const GetStarted: React.FC = () => {
  const router = useRouter();
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

  ];
  const { setLocation, locationName } = useLocation();
  const [query, setQuery] = useState(locationName);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const apiKey = "2c746d271c1a4632b04eebccb46442dd"; // Replace with your actual API key

  const toggleSearch = () => setIsSearchActive((prev) => !prev);

  const fetchLocations = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setResults(data.features || []);
      setActiveIndex(-1);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() !== "") {
      fetchLocations(searchQuery);
    } else {
      setResults([]);
    }
  };

  const handleLocationSelect = (location: any) => {
    const formattedName = location.properties.formatted;
    setQuery(formattedName);
    setIsSearchActive(false);
    setResults([]);
    setLocation(location.properties.lat, location.properties.lon, formattedName);
    router.push('/dashboard');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleLocationSelect(results[activeIndex]);
    }
  };

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    setQuery(locationName);
  }, [locationName]);

  const clearInput = () => {
    setQuery("");
    setResults([]);
    setIsSearchActive(false);
  };

  const slides = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + texts.length) % texts.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

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
        
        <div className="w-full max-w-md">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search location..."
              className="w-full bg-gray-100 border-2 border-green-500 rounded-full pl-10 pr-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsSearchActive(true)}
            />
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2"
              onClick={toggleSearch}
            >
              <svg
                className="fill-gray-400 hover:fill-green-500 transition-colors duration-200"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {query && isSearchActive && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={clearInput}
              >
                <svg
                  className="fill-gray-400 hover:fill-green-500 transition-colors duration-200"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.68342 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}
          </div>
          {isSearchActive && results.length > 0 && (
            <div className="absolute z-10 mt-2 w-full max-w-md rounded-md bg-white shadow-lg">
              {results.map((result: any, index: number) => (
                <div
                  key={index}
                  className={`cursor-pointer px-4 py-2 transition-colors duration-150 ease-in-out hover:bg-gray-100 ${
                    index === activeIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleLocationSelect(result)}
                >
                  <p className="text-sm text-gray-700">
                    {result.properties.formatted}
                  </p>
                </div>
              ))}
            </div>
          )}
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
