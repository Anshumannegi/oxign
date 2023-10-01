"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BiMenuAltLeft } from "react-icons/bi";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-10 left-4 z-10">
        <button
          onClick={openMenu}
          className={`bg-purple-600 hover:bg-purple-500 p-0 w-10 h-10 rounded-full  ${
            isOpen ? "z-0 hidden" : "z-10"
          } flex items-center justify-center`}
        >
          <BiMenuAltLeft  size={"20"} />
        </button>
      </div>

      <div
        className={`fixed bottom-0 left-0 h-full w-64 bg-white border border-solid ${
          isOpen ? "translate-x-0" : "-translate-x-full "
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 p-2 rounded-lg bg-purple-500 text-white"
        >
          Close
        </button>

        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Menu</h1>
          <ul>
            <li className="mb-2">
              <Link
                href="/allAppointments"
                onClick={closeMenu}
                className="block p-2 rounded-lg hover:bg-purple-100"
              >
                All Appointments
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/addAppointment"
                onClick={closeMenu}
                className="block p-2 rounded-lg hover:bg-purple-100"
              >
                Add Appointment
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/allTestForAdmin"
                onClick={closeMenu}
                className="block p-2 rounded-lg hover:bg-purple-100"
              >
                All Lab Tests
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/addLab"
                onClick={closeMenu}
                className="block p-2 rounded-lg hover:bg-purple-100"
              >
                Add Lab Test
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/subscribe"
                onClick={closeMenu}
                className="block p-2 rounded-lg hover:bg-purple-100"
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
