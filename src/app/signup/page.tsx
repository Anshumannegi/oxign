"use client";
import Navbar from "@/app/navbar/page";

import Link from "next/link";
import React, { CSSProperties, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [loader, setLoader] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);


  const isFormNotValid =
    user.email.trim() === "" ||
    user.password.trim() === "" ||
    user.username.trim() === "" ||
    user.password.length < 8 ||
    user.password !== user.confirmPassword;

  const onsSignup = async () => {
    try {
      //loader
      setLoader(true);
      const response = await axios.post("/api/users/signup", user);
      setLoader(false);
      console.log("signup success", response.data);
      //add a toast
      toast.success("Signup Successfully");

      router.push("/login");
    } catch (error: any) {
      console.log("failerd signup", error);
      // console.log(error);
      if (error.response.data.error == "User already exists") {
        toast.error("Already Registered, Please Login");
        router.push("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    // <div className="bg-red-500">Signup</div>
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Signup</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            {/* <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                {user?.password?.length < 8 && (
                  <p className="mt-2 text-sm text-red-500">
                    Password should be at least 8 characters long.
                  </p>
                )}
              </div>
            </div> */}


<div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  id="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
                <button
                type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} 
                </button>
              </div>
            </div>


            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 undefined"
                // className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start relative">
                <input
                  // type="password"
                  type={showPasswordConfirm ? "text" : "password"} 
                  name="confirmPassword"
                  id="confirmPassword"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                />
                   <button
                type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} 
                >
                  {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />} 
                </button>
              </div>
              {user?.password!==user?.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  Password does not matches.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mt-4">
              {loader ? (
                <BeatLoader
                  className=""
                  color={"#D0021B"}
                  // loading={loading}
                  // cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="/login"
                >
                  Already registered?
                </a>
              )}
              <button
                type="button"
                onClick={onsSignup}
                className={`inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 ${
                  isFormNotValid || loader ? "cursor-not-allowed" : ""
                }`}
                disabled={isFormNotValid || loader}
              >
                {loader ? "Signing up..." : "SignUp"}
              </button>
              {loader}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
