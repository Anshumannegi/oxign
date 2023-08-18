"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import logo from "../../assets/logo.png";
import Link from "next/link";
import { AiOutlineMenu  } from "react-icons/ai";
import { RxCross2  } from "react-icons/rx";



export default function Navbar() {
  interface User {
    username: string;
    email: string;
    isAdmin: boolean;
  }
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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

   const addAppointmentMessage = () => {
     if(!user){
      toast.success("Login First");
     }
   } 

   function callOpen() {
    console.log(isOpen);
    setIsOpen(!isOpen);
   }


  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-[#84fab0] to-[#8fd3f4]"
 >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:justify-start">
          <div className="h-16  w-16 bg-white flex justify-center items-center rounded-[50%]">
           <Image src={logo} alt="logo" height={50} width={50} className=" z-1" />
          </div>
          <Link
            className="text-sm font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase text-[#333333] flex justify-center items-center lg:ml-4"
            href="/"
          >
            Oxign
          </Link>
     
          <div className="flex justify-center items-center lg:hidden">
          {isOpen ?  <AiOutlineMenu size={22} onClick={() => callOpen()}/> : <RxCross2 size={22} onClick={() => callOpen()}/>} 
          </div>
        </div>

    
        <div
          className={`lg:flex flex-grow items-center transition-all duration-400 ease-in-out ${
            isOpen ? "h-0 overflow-hidden lg:h-0" : "h-[35vh] lg:h-0"
          }`}
          id="example-navbar-warning"
        >       
          <ul className="flex flex-col  lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                href="/"
              >
                Home
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                  href="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                  href="/signup"
                >
                  Signup
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link
                  onClick={goToProfile}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                  href=""
                >
                  profile({user?.username})
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link
                  onClick={logout}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                  href=""
                >
                  {loader ? "Loging Out..." : "Logout"}
                </Link>
              </li>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                  href="/admin"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
              <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                href="/allTests"
              >
                Lab Tests
              </Link>
            </li>

            {user?.isAdmin && (
              <li className="nav-item">
                <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                href={user ? "/addAppointment" : "/login"}
                onClick={addAppointmentMessage}     
              >
                add appointment
              </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-[#333333] hover:opacity-75"
                  href="/myAppointments"
                >
                my appointment
                </Link>
              </li>
            )}
  
          </ul>
        </div>
      </div>
    </nav>
  );
}
