"use client";

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import BeatLoader from 'react-spinners/BeatLoader';


export const MakeSubscribeUserComponent = () => {

    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        username : "",
        email : "",
        phoneNumber : "",
        uniqueId : "",
        subscriptionDate : "",
    })

    const handleChange = (e: { target: {name: any; value: any}}) => {
       setFormData({
        ...formData,
        [e.target.name] : e.target.value,
       });
    };
    

    const handleSubmit = async ( e : {preventDefault: () => void}) => {
       e.preventDefault();
         
       try{   
      setLoader(true);

       const updatedFormData = {
        ...formData,
       }

       await axios.post("/api/addSubscribedUser", updatedFormData);
      setLoader(false);

      toast.success("ThankYou for Subscribing");

      setFormData({
        username : "",
        email : "",
        phoneNumber : "",
        uniqueId : "",
        subscriptionDate : "",
      })
       
       }catch(error){
        toast.error("Something went wrong. Please try again.");
        setLoader(false);
       }

    }

  return (
    <div className="w-full lg:bg-[#090c31] flex justify-center items-center lg:h-[140vh]">
    <main className="bg-white w-full h-full lg:h-[80%] lg:w-[70%] p-12 lg:rounded-tl-none lg:rounded-tr-[200px] lg:rounded-br-[200px] lg:rounded-bl-none">
      <h2 className="flex uppercase justify-center font-bold text-xl pt-10 pb-3 border-b-2 border-b-orange-700 lg:text-2xl lg:justify-start">
        Make Subscribe User
      </h2>

      <form
        onSubmit={handleSubmit}
        className="m-5 flex flex-col items-center justify-center lg:m-20"
      >
        <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
          <label
            htmlFor="username"
            className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
          >
            Name :
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
          />
        </div>

        <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
          <label
            htmlFor="email"
            className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
          >
            Email :
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
          />
        </div>

        <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
          <label
            htmlFor="number"
            className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
          >
            Phone Number:
          </label>
          <input
            id="number"
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
          />
        </div>

        <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
          <label
            htmlFor="uniqueId"
            className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
          >
            Unique ID :
          </label>
          <input
            id="uniqueId"
            type="number"
            name="uniqueId"
            value={formData.uniqueId}
            onChange={handleChange}
            className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
          />
        </div>

        <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
          <label
            htmlFor="date"
            className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
          >
            Date:
          </label>
          <input
            id="subscriptionDate"
            type="datetime-local"
            name="subscriptionDate"
            value={formData.subscriptionDate}
            onChange={handleChange}
            className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
          />
        </div>

        <button
          type="submit"
          className="mx-0 my-12 p-3 border-none rounded-md bg-[#5853ff] text-white w-52 font-medium text-base cursor-pointer hover:opacity-90 hover:scale-110 duration-500"
          disabled={loader ? true : false}
        >
          {loader ? (
            <div className="flex justify-evenly items-center">
              Booking
              <BeatLoader
                className=""
                color={"#D0021B"}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            "Book Appointment"
          )}
        </button>
      </form>
    </main>
  </div>
  )
}
