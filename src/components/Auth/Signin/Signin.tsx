"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SigninImage from "@/components/Auth/auth.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import useColorMode from "@/hooks/useColorMode";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [colorMode] = useColorMode();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sign in successful", { position: "top-center" });
      router.push("/profile");
    } catch (error) {
      toast.error("Invalid email or password", { position: "top-center" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-2 sm:p-4 lg:p-6 animate-gradient-x`}>
      <div className={`w-full max-w-5xl overflow-hidden rounded-3xl ${colorMode === 'dark' ? 'bg-boxdark' : 'bg-white'} shadow-2xl`}>
        <div className="flex flex-col md:flex-row">
          <div className={`flex flex-col items-center justify-center ${colorMode === 'dark' ? 'bg-boxdark-2' : 'bg-green-100'} p-6 md:w-1/2`}>
            <Link href="/" className="mb-6 text-center transition-transform hover:scale-105">
              <div className="mb-3 flex items-center">
                <span className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-800'} text-4xl font-extrabold`}>Air</span>
                <span className="text-4xl font-extrabold text-green-600">Watch</span>
              </div>
            </Link>
            <Image
              src={SigninImage}
              alt="Signin"
              width={200}
              height={200}
              className="mb-6 transition-transform hover:scale-105 md:w-[300px] md:h-[300px]"
            />
            <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} max-w-sm text-center text-base font-medium md:text-base`}>
              Welcome back to AirWatch. Sign in for real-time air quality data and insights.
            </p>
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-800'} mb-6 text-3xl font-bold`}>Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-4 py-3 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-4 py-3 pr-10 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${colorMode === 'dark' ? 'text-bodydark hover:text-white' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className={`ml-2 block text-sm ${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-900'}`}>
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-gray-300 w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`${colorMode === 'dark' ? 'text-bodydark bg-boxdark' : 'text-gray bg-white'} px-2`}>Or sign in with</span>
                </div>
              </div>
              <div className="mt-3">
                <button className="border-gray-300 text-black hover:bg-gray-50 flex w-full items-center justify-center rounded-lg border bg-white px-3 py-2 text-sm font-medium shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                      <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/>
                      <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/>
                      <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                      </clipPath>
                    </defs>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
            <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} mt-4 text-center text-sm`}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Signin;
