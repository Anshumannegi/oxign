"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { VscChromeClose, VscCheck } from "react-icons/vsc";
import { toast } from "react-hot-toast";

const AllTestForAdmin = () => {
  const [labTests, setLabTests] = useState([]);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        const response = await axios.get("/api/getAllLabtest");
        setLabTests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:");
      }
    }
    fetchLabTests();
  }, []);
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`/api/deleteTest/${id}`);
      const updatedLabTests = labTests.filter((test: any) => test._id !== id);
      setLabTests(updatedLabTests);
      toast.success("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting lab test:", error);
    }
  };
  const handleMarkFeatured = async (id: any, isFeatured: any) => {
    try {
        
      await axios.put("/api/makeFeatured", { id, isFeatured: !isFeatured });
      if(isFeatured){
        toast.success(" Marked not featured Successfully");
      }
      else{
        toast.success(" Marked featured Successfully");
      }
      setLabTests((prevLabTests: any) =>
        prevLabTests.map((test: any) =>
          test._id === id ? { ...test, isFeatured: !isFeatured } : test
        )
      );
      
    } catch (error) {
      console.error("Error updating lab test:");
    }
  };
  return (
    <>
      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Serial Number
            </th>
            <th scope="col" className="px-6 py-4">
              Test name
            </th>
            <th scope="col" className="px-6 py-4">
              Test price
            </th>
            <th scope="col" className="px-6 py-4">
              govt (Test price)
            </th>
            <th scope="col" className="px-6 py-4">
              Result
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
          {labTests.map((appointment: any, index) => {
            return (
              <>
                <tr
                  key={appointment._id}
                  className="border-b dark:border-neutral-500 bg-blue-300"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {appointment.testName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {appointment.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {appointment.govPrice
                      ? `${appointment.govPrice}`
                      : "Not avilable"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {appointment.expectedResults}
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
                      handleMarkFeatured(
                        appointment._id,
                        appointment.isFeatured
                      )
                    }
                  >
                    <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                      {appointment.isFeatured ? "Mark not featured" : "mark featured"}
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AllTestForAdmin;
