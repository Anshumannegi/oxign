"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

const LabTestForm = () => {
  const [formData, setFormData] = useState({
    testName: "",
    price: "",
    image: "",
    expectedResults: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios.post("/api/addLabTest", formData);
      setLoader(false);
      toast.success("Lab test added successfully!");
      // alert("Lab test added successfully!");
      setFormData({
        testName: "",
        price: "",
        image: "",
        expectedResults: "",
      });
    } catch (error) {
      setLoader(false);
      // alert("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full lg:bg-[#090c31] flex justify-center items-center lg:h-[100vh]">
      <main className="bg-white w-full h-full lg:h-[40rem] lg:w-[70%] p-12 lg:rounded-tl-none lg:rounded-tr-[200px] lg:rounded-br-[200px] lg:rounded-bl-none">
        <h2 className="flex uppercase justify-center font-bold text-xl pt-10 pb-3 border-b-2 border-b-orange-700 lg:text-2xl lg:justify-start">
          Add Lab Test
        </h2>
        <form
          onSubmit={handleSubmit}
          className="m-5 flex flex-col items-center justify-center lg:m-20"
        >
          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label
              for="test-name"
              className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
            >
              Test Name:
            </label>
            <input
              id="test-name"
              type="text"
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              required
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label
              for="price"
              className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
            >
              Price:
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label
              for="img-url"
              className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
            >
              Image URL:
            </label>
            <input
              id="img-url"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <div className="flex flex-col w-full items-center lg:flex-row lg:justify-end lg:h-12 lg:w-3/5 m-2">
            <label
              for="result"
              className="font-normal text-lg lg:text-xl lg:w-2/5 mx-0 my-4"
            >
              Expected Results:
            </label>
            <textarea
              id="result"
              name="expectedResults"
              value={formData.expectedResults}
              onChange={handleChange}
              required
              className="self-stretch p-1  rounded-md border border-solid lg:w-4/5 lg:p-4 border-[rgba(123,123,123,0.6)] outline-none"
            />
          </div>

          <button
            type="submit"
            className="mx-0 my-12 p-3 border-none rounded-md bg-[#5853ff] text-white w-52 font-medium text-base cursor-pointer hover:opacity-90"
            disabled={loader ? true : false}
          >
            {loader ? (
              <div className="flex justify-evenly items-center">
                Adding
                <BeatLoader
                  className=""
                  color={"#D0021B"}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              "Add Lab Test"
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default LabTestForm;
