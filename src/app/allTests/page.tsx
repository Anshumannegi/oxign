/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";
import axios from "axios";

const AllLabTests = () => {
  const [labTests, setLabTests] = useState([]);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        const response = await axios.get("/api/getAllLabtest");
        setLabTests(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:");
      }
    }
    fetchLabTests();
  }, []);

  return (
    <div>
      <h2>All Lab Tests</h2>
      <ul>
        {labTests.map((test) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLabTests;
