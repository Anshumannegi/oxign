// /* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import Shimmer from "../component/Shimmer";

const AllLabTests = () => {
  const [labTests, setLabTests] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLabTests, setFilteredLabTests] = useState([]);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        const response = await axios.get("/api/getAllLabtest");
        setLabTests(response.data);
        setFilteredLabTests(response.data);
        setSearchData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:");
      }
    }
    fetchLabTests();
  }, []);

  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
    const inputValue = e.target.value.toLowerCase();
    const updatedFilter = searchData.filter((check: any) =>
      check?.testName.toLowerCase().includes(inputValue)
    );
    setFilteredLabTests(updatedFilter);
  };

  // if(filteredLabTests?.length === 0)
  // {
  //   return(
  //     <>
  //     <div className="flex flex-col lg:flex-row lg:w-full">
  //       <div className="search w-full lg:w-1/4">

  //       </div>
  //       <div className="border border-solid h-full"></div>
  //       <div className="flex flex-col lg:w-3/4">
  //         <div className="flex justify-center items-center my-6 ">
  //           <Shimmer />
  //         </div>
  //       </div>
  //     </div>
  //     </>
  //   )
  // }

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-full">
        <div className="search w-full lg:w-1/4 mx-auto">
          <div className="m-2 p-2">
            <input
              type="text"
              value={search}
              onChange={handleInputChange}
              className="block border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-full lg:w-11/12"
              placeholder="Search for Test..."
            />
          </div>
        </div>
        <div className="border border-solid h-full"></div>
        <div className="flex flex-col lg:w-3/4">
          <div className="flex justify-center items-center my-6 ">
            <h1 className="text-4xl border-b-2 border-sky-500 font-serif">
              All Tests
            </h1>
          </div>
          <div className="card flex flex-wrap justify-evenly items-center">
            {filteredLabTests.map((test: any) => (
              <Card key={test._id} resData={test} labData={labTests} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllLabTests;
