import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroComponentImage from "../../assets/hero-product-img.png";

export default function HeroComponent() {
  return (
    // <div className="max-w-[120rem] my-0 mx-auto">
    //    <div className="grid gap-9 grid-cols-2">
    //       <div className="hero-section-data">
    //         <p className="intro-data my-8 mx-0 mb-0">Welcome to </p>
    //         <h1 className="capitalize font-bold">Manorma Store</h1>
    //         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est iusto minima laboriosam beatae. Id sapiente repudiandae facilis quis, aliquid dolorum!</p>
    //       </div>
    //       <div>
    //       {/* Hero-Section-Image */}
    //          <div className="hero-section-image w-full h-auto flex justify-center items-center">
    //             <figure className="relative after:content-[''] after:w-1/2 after:h-full after:left-0 after:top-[10%] bg-[#5138ee66]">
    //                 <Image src={HeroComponentImage} alt="hero-section-image" className="min-w-[10rem] h-40 " />
    //             </figure>
    //          </div>
    //       </div>
    //    </div>
    // </div>

    <div className="flex-none h-[50vh] w-full lg:flex lg:h-1/4 lg:justify-center lg:truncate">
        <div className="hero-section-data flex-none w-full h-1/3 p-2 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[35%] lg:whitespace-break-spaces">
          <h1 className="capitalize font-bold mb-[1rem] text-2xl lg:text-3xl">Welcome to Manorma Store</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est iusto
            minima laboriosam beatae. Id sapiente repudiandae facilis quis,
            aliquid dolorum!
          </p>
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
