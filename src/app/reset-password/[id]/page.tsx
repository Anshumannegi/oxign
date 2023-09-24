"use client"

import React, { useState } from 'react'
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from 'next/navigation'


const ResetPasswordComponent = () => {
    const params = useParams();
    const [formData, setFormData] = useState({
      newPassword: "",
    //   confirmPassword:"",
    resetToken: ""
      });
      const [loader, setLoader] = useState(false);

    //   console.log(params.id);


  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoader(true);

      const updatedFormData = {
        ...formData,
        resetToken: params.id,
      };

      await axios.post("/api/resetPassword", updatedFormData);
      setLoader(false);

      toast.success("Your Password is Successfully Reset");

      setFormData({
        newPassword: "",
        // confirmPassword:"",
        resetToken:""
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoader(false);

    }
  };

  return (
    <div>
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
      <div>
        <Link href="/">
          <h3 className="text-4xl font-bold text-purple-600">Confirm Password</h3>
        </Link>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <form onSubmit={(e) => handleSubmit(e)}>
         
          <div className="mt-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 undefined"
            >
             New Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 undefined"
            >
             Confirm Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                // value={formData.confirmPassword}
                // onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              disabled={loader ? true : false}
            >
              {/* {loader ? "Loging in....." : "Login"} */}
                   {loader ? (
              <BeatLoader
                className=""
                color={"#D0021B"}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span>
                Login
              </span>
            )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetPasswordComponent