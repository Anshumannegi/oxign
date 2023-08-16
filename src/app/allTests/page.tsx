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
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        setLoader(true);
        const response = await axios.get("/api/getAllLabtest");
        setLoader(false);
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

  if(loader){
    return(
    <div className="flex flex-col ">
    <div className="search w-full h-16">
      <div className="m-2 p-2 flex items-center justify-center lg:justify-start">
        <div className="w-9/12 h-12 bg-[#d9d9d9] lg:w-1/5 rounded-lg"></div>
      </div>
    </div>
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center my-6 ">
        <div className="w-48 h-16 bg-[#d9d9d9] rounded-lg"></div>
      </div>
      <div className="card flex flex-wrap justify-evenly items-center px-8 py-3">
         <Shimmer/>
      </div>
    </div>
  </div>
    );
  }

  else{
  return (
    <>
      <div className="flex flex-col ">
        <div className="search w-full ">
          <div className="m-2 p-2 flex items-center justify-center lg:justify-start">
            <input
              type="text"
              value={search}
              onChange={handleInputChange}
              className="block border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-9/12 lg:w-1/5"
              placeholder="Search for Test..."
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-center items-center my-6 ">
            <h1 className="text-4xl border-b-2 border-sky-500 font-serif">
              All Tests
            </h1>
          </div>
          <div className="card flex flex-wrap justify-evenly items-center px-8 py-3">
            {filteredLabTests.map((test: any) => (
              <Card key={test._id} resData={test} labData={labTests} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
};

export default AllLabTests;
