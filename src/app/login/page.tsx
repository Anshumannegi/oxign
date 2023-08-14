"use client";
import Link from "next/link";
import Navbar from "../navbar/page";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = React.useState(false);

  const onLogin = async (e:any) => {

    e.preventDefault();

    try {
      setLoader(true);
      const respone = await axios.post("/api/users/login", user);
      setLoader(false);
      console.log("resp", respone.data);
      toast.success("Login Successfully");
      router.push("/profile");
      window.location.reload();
    } catch (error: any) {
      console.log("Login failed", error.message);
      if(error.response.data.error == "wrong password"){
        toast.error("Wrong Password, Try Again");
        // console.log(error);
        setLoader(false);
        router.push("/login");
      }
      else if(error.response.data.error == "user not found"){
        toast.error("User Not Found, Please Register First or Wrong Email");
        // console.log(error);
        setLoader(false);
        router.push("/signup");
      }
      // else if(error.response.data.error == "Please Verify from Email"){
      //   toast.error("Please Check Email and Verify");
      //   setLoader(false);
      //   router.push("/login");
      // }
      else{
        toast.error(error.message);
      }
    }
  };
  return (
    // <div className="bg-red-500">Signup</div>
    <div>
      {/* <Navbar/> */}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            {/* <h3 className="text-4xl font-bold text-purple-600">Logo</h3> */}
            <h3 className="text-4xl font-bold text-purple-600">Login</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={onLogin}>
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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">

            {
              loader ? (    <BeatLoader
                className=""
                  color={"#D0021B"}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />) : ( <span>
                  Dont have an account ? <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="/signup"
                >
                  Create Account
                </a>
                </span>)
             }
         
              <button
                type="submit"
                // onClick={onLogin}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                disabled={loader ? true : false}
              >
                {loader?"Loging in.....":"Login"}
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
