"use client"

import { useEffect, useState } from "react";
import axios from "axios";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get("/api/getAllAppointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", );
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>All Appointments</h2>
      <ul>
        {appointments.map((appointment:any) => (
          <li key={appointment._id}>
            Patient ID: {appointment.patientId}
            <br />
            Patient Name: {appointment.patientName}
            <br />
            Date: {appointment.date}
            <br />
            Test Type: {appointment.testType}
            <br />
            Doctor Name: {appointment.doctorName}
            <br />
            Lab Name: {appointment.labName}
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAppointments;
