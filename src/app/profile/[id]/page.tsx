"use client"
import Navbar from "@/app/navbar/page";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  referralCode: any;
  username: string;
  email: string;
  isAdmin: boolean;
}

export default function UserProfilePage({ params }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserDetails();
    console.log(params,"abcd");
  }, []);
//  const handleUpdateLabTest = async () => {
//    try {
//      const response = await axios.put("/api/users/makeUserSubscribed", { id: params.id });

//      if (response.status === 200) {
//        console.log(response.data.message); // "User updated successfully"
//      } else {
//        console.error(response.data.message);
//      }
//    } catch (error) {
//      console.error("Error updating lab test:");
//    }
//  };
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {/* <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture"> */}
        {/* {params.id} */}
        {user && (
          <>
            <h2 className="text-center text-2xl font-semibold mt-3">
              {user.username}
            </h2>
            <p className="text-center text-gray-600 mt-1">{user.email}</p>
            <p className="text-center text-gray-600 mt-1">
              {user.isAdmin ? "Admin" : "Not an admin/simple user"}
            </p>
            <p className="text-center text-gray-600 mt-1">
             referralcode= {user?.referralCode ? user?.referralCode: ""}
            </p>
            {/* <button onClick={handleUpdateLabTest}>click</button> */}
          </>
        )}
      </div>
    </div>
  );
}
