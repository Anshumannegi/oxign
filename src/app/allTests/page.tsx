// /* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/page";
import Card from "../component/Card";


const AllLabTests = () => {
  const [labTests, setLabTests] = useState([]);
  const [filteredLabTests, setFilteredLabTests] = useState([]);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        const response = await axios.get("/api/getAllLabtest");
        setLabTests(response.data);
        setFilteredLabTests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:");
      }
    }
    fetchLabTests();
  }, []);

  const handleMarkFeatured = async (id: any, isFeatured: any) => {
    try {
      await axios.put("/api/makeFeatured", { id, isFeatured: !isFeatured });
      setLabTests((prevLabTests) =>
        prevLabTests.map((test) =>
          test._id === id ? { ...test, isFeatured: !isFeatured } : test
        )
      );
    } catch (error) {
      console.error("Error updating lab test:");
    }
  };

  return (
  <>
      <div className="flex w-full h-[100vh]">
        <div className="search w-1/4 h-full">
           <h1>Search </h1>
        </div>
        <div className="border border-solid h-full"></div>
        <div className="card w-3/4">
        <h1>All Tests</h1>

        {filteredLabTests.map((test)=> (
        <a key={test._id} >
          <Card resData={test} />
        </a>
        ))}

{/* <h1>Featured</h1>
        {filteredLabTests.filter((test)=> (
           test.isFeatured == true
        ))} */}

        </div>
      </div>
      </>
  );
};

export default AllLabTests;



        {/* <ul>
      {filteredLabTests.map((test) => (
          <li key={test._id}>
            <strong>{test.testName}</strong> - Price: ${test.price}
            <br />
            Expected Results: {test.expectedResults}
            <br />
            <img
              src={test.image}
              alt={test.testName}
              style={{ maxWidth: "200px" }}
            />
            { <button
              onClick={() => handleMarkFeatured(test._id, test.isFeatured)}
            >
              Mark {test.isFeatured ? "Not Featured" : "Featured"}
            </button>
            <br />
            <br />
            <br />
            <br />
          </li> }
        ))}
      </ul> */}