"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data.data);
  };
  const getUserID = (user:any) => {
    return user._id;
  }
  console.log("sdaf",  getUserID(user));;
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    date: "",
    testType: "",
    doctorName: "",
    labName: "",
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      patientId: getUserID(user) || "123456", // Set it to user._id if available, or a default value "123456"
    }));
  },  [getUserID(user)]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/appointment", formData);
      alert("Appointment added successfully!");
      setFormData({
        patientId: "",
        patientName: "",
        date: "",
        testType: "",
        doctorName: "",
        labName: "",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  
  return (
    <div className="w-full h-[100vh] lg:bg-[#090c31] flex justify-center items-center">
      <main className="bg-white w-full h-full lg:h-[40rem] lg:w-[70%] p-12 lg:rounded-tl-none lg:rounded-tr-[200px] lg:rounded-br-[200px] lg:rounded-bl-none">
       
         <h2 className="flex uppercase justify-center font-bold text-xl pt-10 pb-3 border-b-2 border-b-orange-700 lg:text-2xl lg:justify-start">Add Appointment</h2>
       
        <form
          onSubmit={handleSubmit}
          className="m-5 flex flex-col items-center justify-center lg:m-20"
        >
          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label htmlFor="name" className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4">
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
            <label htmlFor="date" className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4">Date:</label>
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
            <label htmlFor="test-type" className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4">
              Test Type:
            </label>
            <input
              id="test-type"
              type="text"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label htmlFor="doctor-name" className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4">
              Doctor Name:
            </label>
            <input
              id="doctor-name"
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label htmlFor="lab-name" className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4">
              Lab Name:
            </label>
            <input
              id="lab-name"
              type="text"
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <button type="submit" className="mx-0 my-12 p-3 border-none rounded-md bg-[#5853ff] text-white w-52 font-medium text-base cursor-pointer hover:opacity-90">Add Appointment</button>
        </form>
      </main>
    </div>
  );
};

export default AppointmentForm;


