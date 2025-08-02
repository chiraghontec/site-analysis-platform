"use client";
import React from 'react';
import APITestComponent from '../Components/APITestComponent';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const TestPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins antialiased">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-8 mt-16">
        <div className="mb-8">
          <h1 className="text-5xl font-semibold font-geist text-black mb-4">
            API Integration Test
          </h1>
          <p className="text-2xl font-normal font-poppins text-[#4E4E4E] max-w-[654px]">
            Test the connection between the Next.js frontend and Django backend API.
          </p>
        </div>

        <APITestComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default TestPage;
