"use client";
import Navbar from "@/app/navbar/page";
import React, { useState, useEffect } from "react";

import axios from "axios";
export default function UsesrProfilePage({ params }: any) {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data.data);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {/* <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture"> */}
        <h2 className="text-center text-2xl font-semibold mt-3">{ user?.username}</h2>
        <p className="text-center text-gray-600 mt-1">{user?.email}</p>
        
      </div>
    </div>
  );
}
