"use client";
import Navbar from "@/app/navbar/page";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loader, setLoader] = useState(false);
  const onsSignup = async () => {
    try {
      //loader
      setLoader(true);
      const response = await axios.post("/api/users/signup", user);
       setLoader(false);
      console.log("signup success", response.data);
      //add a toast

      router.push("/login");
    } catch (error: any) {
      console.log("failerd signup", error);
      //add a toast
      alert('something went wrong')
      //reload
    }
  };
  return (
    // <div className="bg-red-500">Signup</div>
        <div>
          <Navbar/>
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
            <div className="mt-4">
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
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/login"
              >
                Already registered?  

              </a>
              <button
                type="button"
                onClick={onsSignup}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                disabled={loader?true:false}
              >
                {loader?"signing in.....":"Register"}
                
              </button>
              {loader}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
