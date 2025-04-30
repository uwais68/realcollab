"use client"; // Required for using useState in Next.js (App Router)

import { useState, ChangeEvent, FormEvent } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp?: string;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Registering...", formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-green-500 flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-3xl font-bold">{isLogin ? "Welcome Back!" : "Join Us Today!"}</h2>
          <p className="mt-2 text-center">
            To keep connected with us please {isLogin ? "login" : "sign up"} with your personal info
          </p>
          <button
            className="mt-4 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-green-500 transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center">{isLogin ? "Sign In" : "Create Account"}</h2>

          {/* Social Login */}
          <div className="flex justify-center mt-4 space-x-4">
            <button className="p-2 bg-gray-200 rounded-full">
              <FaFacebookF className="text-blue-600" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <FaLinkedinIn className="text-blue-700" />
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-600 text-center">or use your email for registration:</p>

          {/* Form */}
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="flex space-x-2">
                <div className="flex items-center border rounded-lg px-3 py-2 w-1/2">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full outline-none"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center border rounded-lg px-3 py-2 w-1/2">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full outline-none"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="w-full outline-none"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
