import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-200   text-center text-white dark:bg-neutral-600 fixed bottom-0 left-0 w-full">
      <div className=" pt-4">
        <div className="mb-4 flex justify-around">
          <a href="#!" className=" text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M14.032 4H9.96c-2.967 0-4.96 1.933-4.96 4.933v4.134H2v3.934h3.008V20h4.012v-7h2.995l.736-3.934h-3.73V8.113c0-.904.353-1.774 1.181-1.774h2.91v-3.34c-.508-.07-1.36-.175-2.582-.175-2.53 0-4.22 1.462-4.22 4.08v2.307H3.996v-4C3.996 4.35 5.606 2 9.793 2c1.478 0 2.808.105 3.185.155z"
                clipRule="evenodd"
              />
            </svg>
          </a>{" "}
          <a href="#!" className=" text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M14.032 4H9.96c-2.967 0-4.96 1.933-4.96 4.933v4.134H2v3.934h3.008V20h4.012v-7h2.995l.736-3.934h-3.73V8.113c0-.904.353-1.774 1.181-1.774h2.91v-3.34c-.508-.07-1.36-.175-2.582-.175-2.53 0-4.22 1.462-4.22 4.08v2.307H3.996v-4C3.996 4.35 5.606 2 9.793 2c1.478 0 2.808.105 3.185.155z"
                clipRule="evenodd"
              />
            </svg>
          </a>{" "}
          <a href="#!" className=" text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M14.032 4H9.96c-2.967 0-4.96 1.933-4.96 4.933v4.134H2v3.934h3.008V20h4.012v-7h2.995l.736-3.934h-3.73V8.113c0-.904.353-1.774 1.181-1.774h2.91v-3.34c-.508-.07-1.36-.175-2.582-.175-2.53 0-4.22 1.462-4.22 4.08v2.307H3.996v-4C3.996 4.35 5.606 2 9.793 2c1.478 0 2.808.105 3.185.155z"
                clipRule="evenodd"
              />
            </svg>
          </a>{" "}
          <a href="#!" className=" text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M14.032 4H9.96c-2.967 0-4.96 1.933-4.96 4.933v4.134H2v3.934h3.008V20h4.012v-7h2.995l.736-3.934h-3.73V8.113c0-.904.353-1.774 1.181-1.774h2.91v-3.34c-.508-.07-1.36-.175-2.582-.175-2.53 0-4.22 1.462-4.22 4.08v2.307H3.996v-4C3.996 4.35 5.606 2 9.793 2c1.478 0 2.808.105 3.185.155z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          {/* Add more social links here */}
        </div>
      </div>

      <div className="bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        © 2023 Copyright:
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://tailwind-elements.com/"
        >
          Oxign
        </a>
      </div>
    </footer>
  );
};

export default Footer;
