"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import Loader from "../component/Loader";
import BeatLoader from "react-spinners/BeatLoader";

const AllTestForAdmin = () => {
  const [labTests, setLabTests] = useState([]);
  const [loader, setloader] = useState(true);
  const [betLoader, setBetLoader] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchLabTests() {
      try {
        setloader(true);
        const response = await axios.get("/api/getAllLabtest");
        setloader(false);
        setLabTests(response.data);
        setSearchData(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:");
      }
    }
    fetchLabTests();
  }, []);
  const handleDelete = async (id: any) => {
    try {
      setBetLoader(true);
      await axios.delete(`/api/deleteTest/${id}`);
      setBetLoader(false);
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
      if (isFeatured) {
        toast.success(" Marked not featured Successfully");
      } else {
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
  // ---------------------------------------------------------------------- search --------------
  // const handleInputChange = (e: any) => {
  //   setSearch(e.target.value);
  // };
  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
    const inputValue = e.target.value.toLowerCase();
    const updatedFilter = searchData.filter((check: any) =>
      check?.testName.toLowerCase().includes(inputValue)
    );
    setLabTests(updatedFilter);
  };

  // const handleSearchClick = () => {
  //   if (search == "") {
  //     toast.success("Please enter test name");
  //   } else {
  //     const updatedFilter = searchData.filter(
  //       (check: any) => check.testName.toLowerCase().includes(search.toLowerCase())
  //     );
  //     if (updatedFilter.length == 0) {
  //       toast.error(" Test Not found");
  //       setSearch("");
  //     } else {
  //       setLabTests(updatedFilter);
  //       setSearch("");
  //     }
  //   }
  // };
  const handleSearchClick = () => {
    if (search === "") {
      toast.success("Please enter test name");
      // Reset labTests to original data when search is empty
      setLabTests(searchData);
    } else {
      const updatedFilter = searchData.filter((check: any) =>
        check?.testName.toLowerCase().includes(search.toLowerCase())
      );
      if (updatedFilter.length === 0) {
        toast.error("Test Not found");
      } else {
        setLabTests(updatedFilter);
      }
    }
  };

  if (loader == true) {
    return <Loader />;
  }
  //else if (labTests.length == 0) {

  //   return <p>No data found</p>;
  // }
  else {
    return (
      <>
        <div className="m-2 p-2">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            className="border rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search for Test..."
          />
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSearchClick}
          >
            Search
          </button> */}
        </div>

        {labTests.length == 0 ? (
          <p>No data found</p>
        ) : (
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b font-medium border-slate-300">
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
                      className="border-b border-slate-300 bg-blue-300"
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
                      >
                        <button
                          className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium"
                          onClick={() => handleDelete(appointment._id)}
                          disabled={betLoader ? true : false}
                        >
                          {betLoader ? (
                            <div className="flex justify-evenly items-center">
                              Deleting
                              <BeatLoader
                                className=""
                                color={"#D0021B"}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            </div>
                          ) : (
                            <div className="flex justify-around items-center">
                              Delete
                              <VscChromeClose color="#FF7276" />
                            </div>
                          )}
                        </button>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4"
                      >
                        <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium"
                           onClick={() =>
                            handleMarkFeatured(
                              appointment._id,
                              appointment.isFeatured
                            )
                          }
                          >
                          {appointment.isFeatured
                            ? "Mark not featured"
                            : "mark featured"}
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  }
};

export default AllTestForAdmin;
