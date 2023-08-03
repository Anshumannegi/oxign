"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { VscChromeClose, VscCheck } from "react-icons/vsc";
import Loader from "../component/Loader";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  
const handleDelete = async (id: any) => {
  try {
    console.log("sdfs");
    await axios.delete(`/api/deleteAppointment/${id}`);
    // After successful deletion, refresh the labTests state to update the list
    const updatedLabTests = appointments.filter((test: any) => test._id !== id);
    setAppointments(updatedLabTests);
  } catch (error) {
    console.error("Error deleting lab test:", error);
  }
};
const markCompleted = async (id: any) => {
  try {
    console.log("sdfs");
    await axios.put(`/api/markComplete/${id}`);
    // After successful deletion, refresh the labTests state to update the list
    // const updatedLabTests = appointments.map((test: any) => {
    //   if(test._id === id){
    //      if(test.isCompleted =! test.isCompleted){
    //       return test;
    //      } 
    //   }
    //   else{
    //     if(test.isCompleted == test.isCompleted)
    //     {
    //       return test;
    //     }
    //   }
    // }
    // );
    // setAppointments(updatedLabTests);
  } catch (error) {
    console.error("Error updating lab test:", error);
  }
};
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get("/api/getAllAppointments");
        console.log(response);
        setAppointments(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching appointments:");
      }
    }
    fetchAppointments();
  }, []);


   if(appointments?.length === 0){
    return <Loader/>
   }

  return (
    <div className="flex flex-col lg:flex-row lg:w-full">
      <div className="search w-full lg:w-1/4">Search</div>
      <div className="border"></div>

      <div className="flex flex-col overflow-x-auto lg:w-3/4">
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
                      Time
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Test Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Test Destination
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Delete Appointment
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>

                 {appointments.map((appointment: any, index) => {
                    if(appointment.isCompleted === true){
                      return (
                        <tr
                          key={appointment._id}
                          className="border-b dark:border-neutral-500 bg-green-300"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.date.slice(0,10).replace(/-/g,'/')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                          {appointment.date.slice(10,24)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.address}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.phoneNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testDestination}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testPrice}
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 "
                            onClick={() => handleDelete(appointment._id)}
                          >
                            <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                              <div className="flex justify-around items-center">
                                Delete
                                <VscChromeClose color="#FF7276" />
                              </div>
                            </button>
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4"
                            onClick={() =>
                              !appointment.isCompleted
                                ? markCompleted(appointment._id)
                                : ""
                            }
                          >
                            <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                              {appointment.isCompleted ? (
                                <div className="flex justify-around items-center">
                                  Completed
                                  <VscCheck color="#83f28f" />
                                </div>
                              ) : (
                                "mark complete"
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    
                    }
                    else if(appointment.date < new Date().toJSON().slice(0,24).replace(/-/g,'-')){
                      return (
                        <tr
                          key={appointment._id}
                          className="border-b dark:border-neutral-500 bg-red-300"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.date.slice(0,10).replace(/-/g,'/')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                          {appointment.date.slice(10,24)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.address}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.phoneNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testDestination}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testPrice}
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 "
                            onClick={() => handleDelete(appointment._id)}
                          >
                            <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                              <div className="flex justify-around items-center">
                                Delete
                                <VscChromeClose color="#FF7276" />
                              </div>
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Missed
                          </td>
                        </tr>
                      );
                    }
                    else{
                      return (
                        <tr
                          key={appointment._id}
                          className="border-b dark:border-neutral-500 "
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.date.slice(0,10).replace(/-/g,'/')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                          {appointment.date.slice(10,24)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.address}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.phoneNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testDestination}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testPrice}
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 "
                            onClick={() => handleDelete(appointment._id)}
                          >
                            <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                              <div className="flex justify-around items-center">
                                Delete
                                <VscChromeClose color="#FF7276" />
                              </div>
                            </button>
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4"
                            onClick={() =>
                              !appointment.isCompleted
                                ? markCompleted(appointment._id)
                                : ""
                            }
                          >
                            <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                              {appointment.isCompleted ? (
                                <div className="flex justify-around items-center">
                                  Completed
                                  <VscCheck color="#83f28f" />
                                </div>
                              ) : (
                                "mark complete"
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
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
