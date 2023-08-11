"use client";

import Link from "next/link";
import Image from "next/image";
import HeroComponentImage from "../../assets/hero-product-img.png";
import { checkout } from "../../helpers/checkout";
import React, { useState, useEffect } from "react";
import axios from "axios";



interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

export default function HeroComponent() {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  

  useEffect(() => {
    getUserDetails();
  },[]);


  const clickBtn = () => {
    console.log("Clicked");
  };

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
    <div className="flex-none h-[60vh] w-full lg:flex lg:h-1/4 lg:justify-center lg:truncate">
      <div className="hero-section-data flex-none w-full h-1/3 p-2 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[35%] lg:whitespace-break-spaces">
        <h1 className="capitalize font-bold mb-[1rem] text-2xl lg:text-3xl">
          Welcome to Oxign{" "}
        </h1>
        <p>
          Subscribe to our Exclusive Lab Test Card and gain access to government
          rates for a wide range of lab tests. Enjoy the convenience of
          affordable and high-quality lab services. Our subscription card
          ensures you get the tests you need without breaking the bank.
          <b>only for Rs.150 per year</b>
        </p>
        <button
          type="button"
          onClick={() => {
            checkout({
              lineItems: [
                { price: "price_1Nc1P0SBaY4bjToVfiuN8LkU", quantity: 1 },
              ],
              user: user
            },);
          }}
          className="inline-flex items-center px-4 py-2 ml-4 mt-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
          // disabled={loader ? true : false}
        >
          {user?.isSubscribed ? "Member" : "Subscribe to the card"}
        </button>
        
      </div>
      {/* Hero-Section-Image */}
      <div className="hero-section-image flex-none w-full h-2/3 p-2 lg:flex lg:w-[35%] lg:justify-center lg:items-center ">
        <Image
          src={HeroComponentImage}
          alt="hero-section-image"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
}
