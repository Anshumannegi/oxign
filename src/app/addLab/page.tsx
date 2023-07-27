"use client"
import { useState } from 'react';
import axios from 'axios';
const LabTestForm = () => {
  const [formData, setFormData] = useState({
    testName: "",
    price: "",
    image: "",
    expectedResults: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/addLabTest", formData);
      alert("Lab test added successfully!");
      setFormData({
        testName: "",
        price: "",
        image: "",
        expectedResults: "",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Lab Test</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Test Name:
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Expected Results:
          <textarea
            name="expectedResults"
            value={formData.expectedResults}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Lab Test</button>
      </form>
    </div>
  );
};

export default LabTestForm;
