"use client";

import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import axios from "axios";



const PaymentSuccess = () => {


  const [user, setUser] = useState(null);


  // useEffect( () => {

  //  async function fetchData(){
  //  await getUserDetails();
  //   if(user){
  //   await handleUpdateLabTest(user);
  //   }
  //   }
  
  //  fetchData();
  // },[]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userDetails = await getUserDetails();
      if (userDetails && window.location.search.length>0) {
        await handleUpdateLabTest(userDetails);
      }
    } catch (error) {
      console.error("Error fetching and updating data:", error);
    }
  };

  const handleUpdateLabTest = async (user: any) => {
    console.log(user?._id, "handleUser");
   
    try {
      const response = await axios.put("/api/users/makeUserSubscribed", {
        id: user?._id,
      });
      console.log(user, "handleUser1");
      if (response.status === 200) {
        console.log(response.data.message); // "User updated successfully"
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating lab test:", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data,"Payment SUCCESS");
      console.log(res.data.data._id,"user id");
       setUser(res.data.data);
       return res.data.data; 
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  return (
       <div className="h-screen">
           <div className="flex flex-col items-center justify-center h-4/6">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
          <div className="text-2xl h-full w-full flex justify-center items-center">
            <TiTick className="text-white h-full w-full" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful
      </h1>
      <p className="text-lg text-gray-700">
        Your payment has been successfully processed. Thank you for Subscribing
      </p>

      <Link href={"/"}>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center lg:text-xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:scale-110 duration-300
    my-12"
        >
          Go Back to Home
        </button>
      </Link>
    </div>
       </div>
  );
};

export default PaymentSuccess;