import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });
  const [showOtp, setShowOtp] = useState(false); // 👈 state to toggle OTP input

  const actionCodeSettings = {
    url: "http://localhost:5173/verify", // ✅ must match redirect domain added in Firebase
    handleCodeInApp: true,
  };

  const sendOtpLink = async (email: string) => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("OTP link sent to your email!");
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Failed to send OTP.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };


  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      <div className="w-full flex flex-col md:flex-row bg-white rounded-[20px] overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <div className="hidden md:flex absolute top-6 left-6 items-center gap-2">
              <img src="/image.png" className="w-6 h-6" alt="logo" />
              <div className="text-blue-600 text-2xl font-bold">HD</div>
            </div>
            <div className="flex md:hidden justify-center items-center mb-6 gap-2">
              <img src="/image.png" className="w-6 h-6" alt="logo" />
              <div className="text-blue-600 text-2xl font-bold">HD</div>
            </div>

            <h2 className="text-3xl font-bold text-center md:text-left text-gray-900 mb-1">
              Sign up
            </h2>
            <p className="text-center md:text-left text-gray-500 mb-6 text-sm">
              Sign up to enjoy the feature of HD
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              {/* Get OTP Button */}
              {!showOtp && (
                <button
                  type="button"
                  onClick={() =>{ sendOtpLink(form.email)}}
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                >
                  Get Link
                </button>
              )}

              {/* OTP Input - Shown after clicking Get OTP */}
              {showOtp && (
                <div className="relative">
                  <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={form.otp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <AiOutlineEyeInvisible className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              )}

              {/* Final Submit Button */}
              {showOtp && (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Sign up
                </button>
              )}
            </form>

            <p className="mt-6 text-sm text-center md:text-left text-gray-600">
              Already have an account??{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>

        {/* Right Side - Image only visible on md+ */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/image1.png"
            alt="signup visual"
            className="w-full h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
