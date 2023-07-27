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
  const userID = user._id
  console.log("sdaf",userID)
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
    <div className="flex flex-col items-center">
      <h2 className="uppercase font-bold text-2xl py-10 border-b-orange-700">Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Test Type:
          <input
            type="text"
            name="testType"
            value={formData.testType}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Doctor Name:
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Lab Name:
          <input
            type="text"
            name="labName"
            value={formData.labName}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
