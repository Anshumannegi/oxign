/* eslint-disable @next/next/no-img-element */
"use client";
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
    <div>
      <h2>All Lab Tests</h2>
      <br />
      <br />

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
            <button
              onClick={() => handleMarkFeatured(test._id, test.isFeatured)}
            >
              Mark {test.isFeatured ? "Not Featured" : "Featured"}
            </button>
            <br />
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLabTests;
