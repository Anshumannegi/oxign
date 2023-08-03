// /* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import Shimmer from "../component/Shimmer";


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

  if(filteredLabTests?.length === 0)
  {
    return(
      <>
      <div className="flex flex-col lg:flex-row lg:w-full">
        <div className="search w-full lg:w-1/4">
           
        </div>
        <div className="border border-solid h-full"></div>
        <div className="flex flex-col lg:w-3/4">
          <div className="flex justify-center items-center my-6 ">
            <Shimmer />
          </div>      
        </div>
      </div>
      </>
    )
  }

  return (
  <>
      <div className="flex flex-col lg:flex-row lg:w-full">
        <div className="search w-full lg:w-1/4">
           <h1>Search </h1>
        </div>
        <div className="border border-solid h-full"></div>
        <div className="flex flex-col lg:w-3/4">
          <div className="flex justify-center items-center my-6 ">
          <h1 className="text-4xl border-b-2 border-sky-500 font-serif">All Tests</h1>
          </div>
         <div className="card flex flex-wrap justify-evenly items-center">

        {filteredLabTests.map((test:any)=> (
        // <Link key={test._id} href="/">
           <Card key={test._id} resData={test}  labData ={labTests} />
        // </Link>
        ))}

{/* <h1>Featured</h1>
        {filteredLabTests.filter((test)=> (
           test.isFeatured == true
        ))} */}

        </div>
        </div>
      </div>
      </>
  );
};

export default AllLabTests;

// labData ={labTests}


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