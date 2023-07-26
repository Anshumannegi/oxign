"use client";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// export default function VerifyEmailPage() {
//   const [token, setToken] = useState("");
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState(false);

//   const verifyUserEmail = async () => {
//     try {
//       await axios.post("/api/users/verifyemail", { token });
//       setVerified(true);
//     } catch (error: any) {
//       setError(true);
//       console.log(error.reponse.data);
//     }
//   };

//   useEffect(() => {
//     const urlToken = window.location.search.split("=")[1];
//     setToken(urlToken || "");
//   }, []);

//   useEffect(() => {
//     if (token.length > 0) {
//       verifyUserEmail();
//     }
//   }, [token]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-4xl">Verify Email</h1>
//       <h2 className="p-2 bg-orange-500 text-black">
//         {token ? `${token}` : "no token"}
//       </h2>

//       {verified && (
//         <div>
//           <h2 className="text-2xl">Email Verified</h2>
//           <Link href="/login">Login</Link>
//         </div>
//       )}
//       {error && (
//         <div>
//           <h2 className="text-2xl bg-red-500 text-black">Error</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// pages/verify.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Verify = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Send a request to the backend to verify the email address
      axios
        .post('/api/uers/verifyemail', { token })
        .then((response) => {
          console.log('Email verification successful:', response.data.message);
          // You can display a success message or redirect to a login page, for example
        })
        .catch((error) => {
          console.error('Email verification failed:', error);
          // Display an error message or redirect to an error page, for example
        });
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      {/* You can add loading or success/error messages here */}
    </div>
  );
};

export default Verify;

