"use client";
import Navbar from "@/app/navbar/page";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/UserContext';


export default function ProfilePage() {
  // const [user, setUser] = useState({});
  interface User {
    username: string;
    email: string;
    isAdmin: boolean;
  }
  //  const [user, setUser] = useState<User | null>(null);
  const { checkUser } = useContext(UserContext);

  // useEffect(() => {
  //   getUserDetails();
  // }, []);
  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   console.log("profiledata",res.data.data.isAdmin);
  //   setUser(res.data.data);
  // };
  return (
    <div>
      {/* <Navbar /> */}

      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {/* <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture"> */}
        <h2 className="text-center text-2xl font-semibold mt-3">
          {checkUser?.username}
        </h2>
        <p className="text-center text-gray-600 mt-1">{checkUser?.email}</p>

        <p className="text-center text-gray-600 mt-1">
          {checkUser?.isAdmin ? "Admin" : "Not an admin/simple user"}
        </p>
      </div>
    </div>
  );
}
