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
  const userID = user._id;
  console.log("sdaf", userID);
  const [formData, setFormData] = useState({
    patientId: userID || "123456",
    patientName: "",
    date: "",
    testType: "",
    doctorName: "",
    labName: "",
  });

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
    <div className="w-full h-[100vh] bg-[#090c31] flex justify-center items-center">
      <main className="bg-white h-[40rem] w-[70%] p-12 rounded-tl-none rounded-tr-[200px] rounded-br-[200px] rounded-bl-none">
       
         <h2 className="flex uppercase font-bold text-2xl pt-10 pb-3 border-b-2 border-b-orange-700">Add Appointment</h2>
       
        <form
          onSubmit={handleSubmit}
          className="m-20 flex flex-col items-center justify-center"
        >
          <div className="h-12 flex items-center justify-end w-3/5 m-2">
            <label className="font-normal text-xl w-2/5 mx-0 my-4">
              Patient Name:
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="self-stretch w-4/5 p-4 rounded-md border border-solid border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="h-12 flex items-center justify-end w-3/5 m-2">
            <label className="font-normal text-xl w-2/5 mx-0 my-4">Date:</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="self-stretch w-4/5 p-4 rounded-md border border-solid border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="h-12 flex items-center justify-end w-3/5 m-2">
            <label className="font-normal text-xl w-2/5 mx-0 my-4">
              Test Type:
            </label>
            <input
              type="text"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              className="self-stretch w-4/5 p-4 rounded-md border border-solid border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="h-12 flex items-center justify-end w-3/5 m-2">
            <label className="font-normal text-xl w-2/5 mx-0 my-4">
              Doctor Name:
            </label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="self-stretch w-4/5 p-4 rounded-md border border-solid border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="h-12 flex items-center justify-end w-3/5 m-2">
            <label className="font-normal text-xl w-2/5 mx-0 my-4">
              Lab Name:
            </label>
            <input
              type="text"
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              className="self-stretch w-4/5 p-4 rounded-md border border-solid border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <button type="submit" className="mx-0 my-12 p-3 border-none rounded-md bg-[#5853ff] text-white w-52 font-medium text-base cursor-pointer hover:opacity-90">Add Appointment</button>
        </form>
      </main>
    </div>
  );
};

export default AppointmentForm;


