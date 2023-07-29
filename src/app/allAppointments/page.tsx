"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get("/api/getAllAppointments");
        setAppointments(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching appointments:");
      }
    }
    fetchAppointments();
  }, []);



  return (


    <div className="flex w-full h-[100vh]">
      <div className="search w-1/4"></div>
      <div className="border"></div>

      <div className="flex flex-col overflow-x-auto w-3/4">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Serial Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Patient ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Patient Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Test Type
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Doctor Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Lab Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment: any, index) => (   
                    <tr
                      key={appointment._id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {
                          index+1
                        }
                      </td>
                    
                      <td className="whitespace-nowrap px-6 py-4">{appointment.patientId}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.patientName}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.testType}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.doctorName}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.labName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
