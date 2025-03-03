"use client"


import { useState } from "react";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Login Button (Navbar or Anywhere) */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>

      {/* ✅ Modal (Popup) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

            {/* Login Form */}
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                login In
              </button>
            </form>

            {/* 🔹 OR Section */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* 🔹 Social Login */}
            <div className="flex flex-col space-y-2">
              <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
                Log in with Google
              </button>
              <button className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition">
                Log in with Facebook
              </button>
            </div>

            {/* 🔹 Sign Up Link */}
            <p className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>

            {/* ❌ Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}

