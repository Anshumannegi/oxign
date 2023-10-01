import React from "react";
import {
  AiFillGoogleCircle,
  AiFillAmazonCircle,
  AiFillYoutube,
  AiFillInstagram,
  AiOutlineSend,
} from "react-icons/ai";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] min-h-40 p-16 text-white">
      <div className="w-full lg:flex lg:justify-between lg:items-center  ">
        {/* Column 1 (Input) */}
        <div className="w-full lg:w-1/3 px-4 lg:border-none">
          <h2 className="text-md uppercase text-black lg:text-left lg:text-xl">
            for latest updates
          </h2>
          <div className="flex border-b-2 border-black py-2 ">
            <input
              type="text"
              placeholder="Enter Email Here..."
              className="w-full h-10 border-none rounded-lg outline-none focus:border-none text-black text-lg"
            />
            <button className="p-0 text-black bg-transparent hover:bg-purple-100 rounded-r-lg">
              <AiOutlineSend size={30} />
            </button>
          </div>
        </div>

        {/* Column 2 (Oxign) */}
        <div className="w-full lg:w-1/3 lg:border-l-2 lg:border-r-2">
          <h2 className="text-uppercase text-center text-[#5853ff] lg:text-lg">
            Oxign
          </h2>
          <div className="text-center">
            <Link
              href="mailto:oxignpathlab@gmail.com"
              className="text-[#5853ff] lg:text-lg"
            >
              SEND MAIL TO-oxignpathlab@gmail.com
            </Link>
          </div>
        </div>

        {/* Column 3 (Social Media) */}
        <div className="w-full lg:w-1/3 text-center">
          <div className="p-2 flex items-center justify-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
            <article className="flex mx-1 my-0 flex-wrap justify-center">
              <Link
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="m-2 h-14 w-14 bg-white rounded-full flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand"
                  style={{ animationDelay: "0.3s" }}
                >
                  <AiFillGoogleCircle className="text-2xl" />
                  <p className="text-xs font-black text-[#090c31]">Google</p>
                </div>
              </Link>
              <Link
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="m-2 h-14 w-14 bg-white rounded-full flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand"
                  style={{ animationDelay: "0.5s" }}
                >
                  <AiFillAmazonCircle className="text-2xl" />
                  <p className="text-xs font-black text-[#090c31]">Amazon</p>
                </div>
              </Link>
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="m-2 h-14 w-14 bg-white rounded-full flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand"
                  style={{ animationDelay: "0.7s" }}
                >
                  <AiFillYoutube className="text-2xl" />
                  <p className="text-xs font-black text-[#090c31]">Youtube</p>
                </div>
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="m-2 h-14 w-14 bg-white rounded-full flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand"
                  style={{ animationDelay: "1s" }}
                >
                  <AiFillInstagram className="text-2xl" />
                  <p className="text-xs font-black text-[#090c31]">Instagram</p>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
