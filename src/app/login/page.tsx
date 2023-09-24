"use client";
import Link from "next/link";
import Navbar from "../navbar/page";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
  });

  const [loader, setLoader] = React.useState(false);
  const [loaderModal, setLoaderModal] = React.useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const onLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoader(true);
      const respone = await axios.post("/api/users/login", user);
      setLoader(false);
      console.log("resp", respone.data);
      toast.success("Login Successfully");
      router.push("/profile");
      window.location.reload();
    } catch (error: any) {
      console.log("Login failed", error.message);
      if (error.response.data.error == "wrong password") {
        toast.error("Wrong Password, Try Again");
        // console.log(error);
        setLoader(false);
        router.push("/login");
      } else if (error.response.data.error == "user not found") {
        toast.error("User Not Found, Please Register First or Wrong Email");
        // console.log(error);
        setLoader(false);
        router.push("/signup");
      }
      // else if(error.response.data.error == "Please Verify from Email"){
      //   toast.error("Please Check Email and Verify");
      //   setLoader(false);
      //   router.push("/login");
      // }
      else {
        toast.error(error.message);
      }
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoaderModal(true);
    try {
      const updatedFormData = {
        ...formData,
      };

      await axios.post("/api/forgot-password", updatedFormData);
      toast.success("Check your Email to Reset Password");
      setFormData({
        email: "",
      });
      setLoaderModal(false)
      closeModal();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoaderModal(false)
      closeModal();
      console.log(error);
    }
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      {/* <Navbar/> */}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link href="/">
            <h3 className="text-4xl font-bold text-purple-600">Login</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={onLogin}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              {loader ? (
                <BeatLoader
                  className=""
                  color={"#D0021B"}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span>
                  Dont have an account ?{" "}
                  <Link
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                    href="/signup"
                  >
                    Create Account
                  </Link>
                </span>
              )}

              <button
                type="submit"
                // onClick={onLogin}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                disabled={loader ? true : false}
              >
                {loader ? "Loging in....." : "Login"}
              </button>
            </div>
          </form>

          <div className="w-full flex justify-center items-center">
            <div className="py-4 mt-2 text-white flex items-center justify-around">
              <button className="btn text-black" onClick={openModal}>
                forgot password
              </button>
              <dialog id="my_modal_1" className="modal" ref={modalRef}>
                <div className="modal-box p-8">
                  <form
                    className="w-full max-w-sm"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-evenly">
                  <div>
                  <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
                    >
                      {loaderModal ? (
                <BeatLoader
                  className=""
                  color={"#D0021B"}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span>
                      Send
               
                </span>
              )}
                    </button>
                  </div>
                    <div className="modal-action">
                    <form method="dialog">
                      <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded " onClick={closeModal}>
                        Close
                      </button>
                    </form>
                  </div>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
