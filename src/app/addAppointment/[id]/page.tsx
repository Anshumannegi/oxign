"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import Loader from "@/app/component/Loader";

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

const BookMyAppointment = ({ params }: any) => {
  // const [user, setUser] = useState({});
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [loader, setLoader] = useState(true);
  const [beatloader, setBeatLoader] = useState(false);

  const [lab, setLab] = useState([]);

  useEffect(() => {
    getUserDetails();
    getAllLabTest();
  }, []);
  const getUserDetails = async () => {
    setLoader(true);

    const res = await axios.get("/api/users/me");
    setLoader(false);
    console.log(res?.data);
    setUser(res?.data?.data);
  };
  const getUserID = (user: any) => {
    return user?._id;
  };
  // console.log("sdaf", getUserID(user));
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    date: "",
    testName: "",
    address: "",
    phoneNumber: "",
    testDestination: "",
    testPrice: 0,
    email: user?.email,
  });
  const isFormNotValid =
    formData.patientName.trim() === "" ||
    formData.address.trim() === "" ||
    formData.testDestination.trim() === "" ||
    formData.date.trim() === "" ||
    phoneNumberError;
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      patientId: getUserID(user) || "123456", // Set it to user._id if available, or a default value "123456"
    }));
  }, [getUserID(user)]);

  const getAllLabTest = async () => {
    try {
      setLoader(true);

      const allLabResponse = await axios.get("/api/getAllLabtest");
      setLoader(false);

      console.log(allLabResponse?.data);
      setLab(allLabResponse?.data);
      console.log(params, "parms");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
        if (e.target.name === "phoneNumber") {
          const phoneNumber = e.target.value;
          setFormData({
            ...formData,
            [e.target.name]: phoneNumber,
          });

          if (phoneNumber.length !== 10) {
            setPhoneNumberError("Please enter a 10-digit phone number");
          } else {
            setPhoneNumberError("");
          }
        }
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e: { preventDefault: () => void }, test: any) => {
    e.preventDefault();
    try {
      setBeatLoader(true);

      const updatedFormData = {
        ...formData,
        testName: test?.testName,
        testPrice: user?.isSubscribed ? test?.govPrice : test?.price,
        // testPrice: test?.price,
        email: user?.email,
      };
      await axios.post("/api/users/appointment", updatedFormData);
      setBeatLoader(false);

      toast.success("Appointment Booked Successfully");

      // alert("Appointment added successfully!");
      setFormData({
        patientId: "",
        patientName: "",
        date: "",
        testName: "",
        address: "",
        testPrice: 0,
        testDestination: "",
        phoneNumber: "",
        email: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoader(false);
      // alert("Something went wrong. Please try again.");
    }
  };
  if (loader) {
    return <Loader />;
  } else {
    return (
      <div>
        {lab.map((test: any) => {
          if (params?.id == test?._id) {
            return (
              <div key={test?._id}>
                <div className="w-full lg:bg-[#090c31] flex justify-center items-center lg:h-[140vh]">
                  <main className="bg-white w-full h-full lg:h-[80%] lg:w-[70%] p-12 lg:rounded-tl-none lg:rounded-tr-[200px] lg:rounded-br-[200px] lg:rounded-bl-none">
                    <p>
                      <b>Test Description</b>
                    </p>
                    {test?.description}
                    <h2 className="flex uppercase justify-center font-bold text-xl pt-10 pb-3 border-b-2 border-b-orange-700 lg:text-2xl lg:justify-start">
                      Add Appointment
                    </h2>

                    <form
                      onSubmit={(e) => handleSubmit(e, test)}
                      className="m-5 flex flex-col items-center justify-center lg:m-20"
                    >
                      <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
                        <label
                          htmlFor="name"
                          className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
                        >
                          Patient Name:
                        </label>

                        <input
                          id="name"
                          type="text"
                          name="patientName"
                          value={formData?.patientName}
                          onChange={handleChange}
                          className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
                        />
                      </div>
                      {formData.patientName.trim() === "" && (
                        <p className="mt-2 text-sm text-red-500">
                          Plz enter patient name
                        </p>
                      )}
                      <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
                        <label
                          htmlFor="date"
                          className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
                        >
                          Date of appointment:
                        </label>
                        <input
                          id="date"
                          type="datetime-local"
                          name="date"
                          value={formData?.date}
                          onChange={handleChange}
                          className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
                        />
                      </div>
                      {formData.date.trim() === "" && (
                        <p className="mt-2 text-sm text-red-500">
                          Plz select Date
                        </p>
                      )}

                      <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
                        <label
                          htmlFor="test-type"
                          className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
                        >
                          Test Name:
                        </label>
                        <input
                          id="test-type"
                          type="text"
                          disabled
                          name="testName"
                          value={test?.testName}
                          className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none bg-slate-300"
                        />
                      </div>

                      <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
                        <label
                          htmlFor="address"
                          className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
                        >
                          Address:
                        </label>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          value={formData?.address}
                          onChange={handleChange}
                          className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
                        />
                      </div>
                      {formData.address.trim() === "" && (
                        <p className="mt-2 text-sm text-red-500">
                          Plz Enter address
                        </p>
                      )}

                      <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
                        <label
                          htmlFor="test-price"
                          className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
                        >
                          Test Price:
                        </label>
                        <input
                          id="test-price"
                          type="number"
                          name="testPrice"
                          disabled
                          value={
                            user?.isSubscribed ? test?.govPrice : test?.price
                          }
                          className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none bg-slate-300"
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
                          value={formData?.phoneNumber}
                          onChange={handleChange}
                          className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
                        />
                      </div>
                      {formData?.phoneNumber.length !== 10 && (
                        <p className="mt-2 text-sm text-red-500">
                          {phoneNumberError}
                        </p>
                      )}
                      {formData?.phoneNumber.length === 0 && (
                        <p className="mt-2 text-sm text-red-500">
                          plz enter phone number
                        </p>
                      )}
                      {/* {formData.phoneNumber?.length !== 10 && (
          <p className="mt-2 text-sm text-red-500">
            Please enter a 10-digit phone number
          </p>
        )} */}
                      <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
                        <label
                          htmlFor="test-destination"
                          className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
                        >
                          Test Destination:
                        </label>

                        <div className="self-stretch p-1 lg:w-[85%] lg:p-4  flex">
                          <input
                            id="test-destination-home"
                            type="radio"
                            name="testDestination"
                            value="Home"
                            checked={formData?.testDestination === "Home"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label
                            htmlFor="test-destination-home"
                            className="mr-6 flex justify-center items-center"
                          >
                            Test at Home
                          </label>
                          <input
                            id="test-destination-office"
                            type="radio"
                            name="testDestination"
                            value="Office"
                            checked={formData?.testDestination === "Office"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label
                            htmlFor="test-destination-office"
                            className="flex justify-center items-center"
                          >
                            Test at Near by Lab
                          </label>
                        </div>
                      </div>
                      {formData.testDestination.trim() === "" && (
                        <p className="mt-2 text-sm text-red-500">
                          Plz select destination
                        </p>
                      )}
                      {/* {isFormNotValid || loader ? "true" : "false"} */}
                      <button
                        type="submit"
                        className="mx-0 my-12 p-3 border-none rounded-md bg-[#5853ff] text-white w-52 font-medium text-base cursor-pointer hover:opacity-90 hover:scale-110 duration-500"
                        disabled={isFormNotValid || loader ? true : false}
                      >
                        {beatloader ? (
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
              </div>
            );
          }
        })}
      </div>
    );
  }
};

export default BookMyAppointment;
