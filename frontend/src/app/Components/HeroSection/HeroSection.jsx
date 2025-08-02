"use client";
import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-80 flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/siteimage.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Interactive Map</h1>
        <Link 
          href="/map"
          className="inline-block px-8 py-3 bg-red-800 text-white font-medium rounded hover:bg-red-700 transition-colors"
        >
          Open
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
