import React from "react";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

const PaymentFail = () => {
  return (
       <div className="h-screen">
           <div className="flex flex-col items-center justify-center h-4/6">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
          <div className="text-2xl h-5/6 w-5/6 flex justify-center items-center">
            <RxCross1 className="text-white h-full w-full" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Fail
      </h1>
      <p className="text-lg text-gray-700">
        Your payment has been Failed. Please Try Again
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

export default PaymentFail;