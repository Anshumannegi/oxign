"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import logo from "../../assets/logo.ico";

export default function Navbar() {
  interface User {
    username: string;
    email: string;
    isAdmin: boolean;
  }
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(false);

  const logout = async () => {
    try {
      setLoader(true);
      await axios.get("/api/users/logout");
      setLoader(false);
      toast.success("Logout Successfully");
      router.push("/login");
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
      setLoader(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    console.log("inside");
    const loggedIn = checkLoggedIn();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      getUserDetails();
    }
  }, [user]);
  const checkLoggedIn = () => {
    return !user;
  };

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   console.log(res.data);
  //   setUser(res.data.data);
  // };
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
      setUser(null); // Set user to null to indicate no authenticated user
    }
  };
  const goToProfile = async () => {
    const res = await axios.get("/api/users/me");
    if (res.data.data._id) {
      router.push(`/profile/${res.data.data._id}`);
    }
  };
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 ">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:justify-start">
          <Image src={logo} alt="logo" height={20} className="mr-4 " />
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="/"
          >
            Oxign
          </a>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
          >
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>

        <div
          className="lg:flex flex-grow items-center"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/"
              >
                Home
              </a>
            </li>

            {!user && (
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/login"
                >
                  Login
                </a>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/signup"
                >
                  Signup
                </a>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <p
                  onClick={goToProfile}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  profile({user?.username})
                </p>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <p
                  onClick={logout}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  {loader ? "Loging Out..." : "Logout"}
                </p>
              </li>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/admin"
                >
                  Admin Dashboard
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
