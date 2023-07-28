"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroComponentImage from "../../assets/hero-product-img.png";
import {useState} from "react";

export default function HeroComponent() {

    const [loader, setLoader] = useState(false);

    const clickBtn = () => {
        
        console.log("Clicked")
    }

  return (

    <div className="flex-none h-[60vh] w-full lg:flex lg:h-1/4 lg:justify-center lg:truncate">
        <div className="hero-section-data flex-none w-full h-1/3 p-2 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[35%] lg:whitespace-break-spaces">
          <h1 className="capitalize font-bold mb-[1rem] text-2xl lg:text-3xl">Welcome to Manorma Store</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est iusto
            minima laboriosam beatae. Id sapiente repudiandae facilis quis,
            aliquid dolorum!
          </p>
          <button
                type="button"
                onClick={clickBtn}
                className="inline-flex items-center px-4 py-2 ml-4 mt-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                // disabled={loader ? true : false}
              >
                {loader?"Clicked.....":"Click Me"}
                
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
