"use client"
import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    testType: "",
    doctorName: "",
    labName: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/appointment", formData);
      alert("Appointment added successfully!");
      setFormData({
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
    <div>
      <h2>Add Appointment</h2>
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
