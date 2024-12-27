'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigating to other pages

export default function LoginPage() {
  const [email, setEmail] = useState(''); // State to store email input
  const [password, setPassword] = useState(''); // State to store password input
  const router = useRouter(); // Router for navigation

  // Handle login button click
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    // For now, navigate to the dashboard directly
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Your Gym App</h1>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
