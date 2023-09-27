"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import PrivateRoute from "@/app/component/PrivateRoute";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

interface SubscribedUser {
  _id: number;
  username: string;
  email: string;
  phoneNumber: number;
  uniqueId: number;
}

const AppointmentForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);
  // const [verifyLoader, setVerifyLoader] = useState(false);
  const [labTests, setLabTests] = useState([]);

  const [subscribedUsers, setSubscribedUsers] = useState<SubscribedUser[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [selectedLabTest, setSelectedLabTest] = useState<{
    testName: string;
    price: number;
    govPrice: number;
  } | null>(null);

  
  const [uniqueCode, setUniqueCode] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    getUserDetails();
    fetchLabTests();
    getSubscribedUsers();
  }, []);



  useEffect(() => {
    if (formSubmitted && verified) {
      setFormSubmitted(false);
      toast.success("Verification successful!");
    }
  }, [formSubmitted, verified]);


  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data.data);
  };

  const getSubscribedUsers = async () => {
    const res = await axios.get("/api/getAllSubscribedUsers");
    setSubscribedUsers(res.data);
    console.log(res.data);
  };
  const getUserID = (user: any) => {
    return user?._id;
  };
  const fetchLabTests = async () => {
    try {
      const response = await axios.get("/api/getAllLabtest");
      setLabTests(response.data); // Set lab tests data in the state
    } catch (error) {
      console.error("Error fetching lab tests:", error);
    }
  };
  // console.log("sdaf", getUserID(user));
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    date: "",
    testName: "",
    address: "",
    phoneNumber: 0,
    testDestination: "",
    testPrice: 0,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      patientId: getUserID(user) || "123456", // Set it to user._id if available, or a default value "123456"
    }));
  }, [getUserID(user)]);

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "testName") {
      // Find the selected test based on its name
      // const selectedTest = labTests.find((test:any) => test.testName === value);
      const selectedTest = (
        labTests as { testName: string; price: number; govPrice: number }[]
      ).find((test: any) => test.testName === value);

      // setSelectedLabTest(selectedTest)
      setSelectedLabTest(selectedTest as {
        testName: string;
        price: number;
        govPrice: number;
      });

      if (selectedTest) {
        // Set the price of the selected test in the form data
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          // testPrice: selectedTest?.price || 0,
          testPrice: verified ? selectedTest?.govPrice : selectedTest?.price,
          testName: selectedTest?.testName,
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeForUniqueCode = async (e: {
    target: { name: any; value: any };
  }) => {
    e.target.name = e.target.value;
    setUniqueCode(e.target.name);
    console.log(e.target.name, "name");
  };

  const checkUniqueNumberVerifed = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {

      subscribedUsers?.map((subscribedUser) => {
        // if(user?.email == subscribedUser?.email){
        console.log(uniqueCode);
        if (subscribedUser?.uniqueId == uniqueCode) {
          setVerified(true);
          setFormData((prevFormData: any) => ({
            ...prevFormData,
            // testPrice: selectedTest?.price || 0,
            testPrice: verified ? selectedLabTest?.govPrice : selectedLabTest?.price,
          }));

          setFormSubmitted(true);
        }
        // }
      });

    } catch (error) {
      console.error("Error fetching Subscribed Users:", error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios.post("/api/users/appointment", formData);
      setLoader(false);
      toast.success("Appointment Booked Successfully");

      setFormData({
        patientId: "",
        patientName: "",
        date: "",
        testName: "",
        address: "",
        testPrice: 0,
        testDestination: "",
        phoneNumber: 0,
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoader(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="w-full lg:bg-[#090c31] flex justify-center items-center lg:h-[140vh]">
        <main className="bg-white w-full h-full lg:h-[80%] lg:w-[70%] p-12 lg:rounded-tl-none lg:rounded-tr-[200px] lg:rounded-br-[200px] lg:rounded-bl-none">
          <h2 className="flex uppercase justify-center font-bold text-xl pt-10 pb-3 border-b-2 border-b-orange-700 lg:text-2xl lg:justify-start">
            Add Appointment
          </h2>

          <form
            onSubmit={handleSubmit}
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
                value={formData.patientName}
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
                id="date"
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
              />
            </div>

            <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
              <label
                htmlFor="test-type"
                className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
              >
                Test Name:
              </label>
              <select
                id="test-type"
                name="testName"
                value={formData.testName}
                onChange={handleChange}
                className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
              >
                <option value="">Select Test</option>
                {labTests.map((test: any) => (
                  <option key={test.id} value={test.testName}>
                    {test.testName}
                  </option>
                ))}
              </select>
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
                value={formData.address}
                onChange={handleChange}
                className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
              />
            </div>

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
                // value={formData.testPrice}
                value={verified ? selectedLabTest?.govPrice : selectedLabTest?.price}
                onChange={handleChange}
                className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
                disabled
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
                htmlFor="test-destination"
                className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
              >
                Test Destination:
              </label>

              {/* border-solid */}
              {/* rounded-md border */}
              {/* border-[rgba(123,123,123,0.6)] outline-none */}
              {/* lg:w-4/5 */}
              <div className="self-stretch p-1 lg:w-[85%] lg:p-4  flex">
                <input
                  id="test-destination-home"
                  type="radio"
                  name="testDestination"
                  value="Home"
                  checked={formData.testDestination === "Home"}
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
                  checked={formData.testDestination === "Office"}
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

            <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
              <label
                htmlFor="number"
                className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
              >
                Id :
              </label>
              <input
                id="number"
                type="number"
                name="uniqueCode"
                value={uniqueCode}
                onChange={handleChangeForUniqueCode}
                className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
              />

              <button
                type="submit"
                disabled={verified}
                className="mx-0 my-12 p-3 border-none rounded-md bg-[#5853ff] text-white w-52 font-medium text-base cursor-pointer hover:opacity-90 hover:scale-110 duration-500"
                // disabled={loader ? true : false}
                onClick={checkUniqueNumberVerifed}
              >
           { verified ? (
                  <div className="flex justify-evenly items-center">
                    <TiTick className="text-white" />
                    Verified
                  </div>
                ) : (
                  <div className="flex justify-evenly items-center">
                    <RxCross1 className="text-white" />
                    Not Verified
                  </div>
                )}
              </button>

              {/* 
              {verified ? <TiTick className="text-white h-full w-full" /> : <RxCross1 className="text-white h-full w-full" /> } */}

              {/* {verified ? "verified" : "Not Verified"} */}
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
    </PrivateRoute>
  );
};

export default AppointmentForm;
