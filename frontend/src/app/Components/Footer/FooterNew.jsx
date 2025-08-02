"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left section */}
          <div className="space-y-2">
            <Link href="/dashboard" className="block hover:text-gray-300 transition-colors">
              Dashboard
            </Link>
            <Link href="/sources" className="block hover:text-gray-300 transition-colors">
              Sources
            </Link>
            <Link href="/feedback" className="block hover:text-gray-300 transition-colors">
              Feedback
            </Link>
          </div>

          {/* Middle section */}
          <div className="space-y-2">
            <Link href="/about" className="block hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block hover:text-gray-300 transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="block hover:text-gray-300 transition-colors">
              Terms And Conditions
            </Link>
          </div>

          {/* Right section - Logo/Button */}
          <div className="md:col-span-2 flex justify-end">
            <div className="w-12 h-12 bg-red-800 rounded flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-right">
          <p className="text-sm text-gray-400">© XYZ copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
