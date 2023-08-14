"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import { format } from 'date-fns';

export default function Suscribe() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchSuscribe();
  }, []);

  async function fetchSuscribe() {
    try {
      const res = await axios.get("/api/allUsers");
      console.log(res.data, "hii");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  function convertToIndianTimeAndBeautify(utcDateString: any) {
    const utcDate = new Date(utcDateString);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return utcDate.toLocaleString("en-IN", options);
  }

  // function convertToIndianTimeAndBeautify(utcDateString: string) {
  //   const utcDate = new Date(utcDateString);
  //   const indianDate = utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  //   return format(parseInt(indianDate), 'yyyy-MM-dd HH:mm:ss');
  // }

  function calculateDateAfterOneYear(inputDate: any) {
    const date = new Date(inputDate);
    date.setFullYear(date.getUTCFullYear() + 1);
    return convertToIndianTimeAndBeautify(date.toISOString());
  }
  // return (
  //   <>
  //   <div className="max-w-3xl mx-auto p-4">
  //     <p className="text-lg font-semibold mb-2">subscribe</p>
  //     <table className="w-full table-auto">
  //       <thead>
  //         <tr>
  //           <th className="px-4 py-2">Serial Number</th>
  //           <th className="px-4 py-2">Subscriber Name</th>
  //           <th className="px-4 py-2">Subscribe Date</th>
  //           <th className="px-4 py-2">Subscribe Last Date</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users
  //           .filter((user) => user?.isSubscribed)
  //           .map((user, index) => (
  //             <tr
  //               key={index}
  //               className="bg-blue-300 hover:bg-blue-200 transition-colors"
  //             >
  //               <td className="px-4 py-2">{index + 1}</td>
  //               <td className="px-4 py-2">{user?.username}</td>
  //               <td className="px-4 py-2">
  //                 {user?.subscriptionDate &&
  //                   convertToIndianTimeAndBeautify(user?.subscriptionDate)}
  //               </td>
  //               <td className="px-4 py-2">
  //                 {user?.subscriptionDate &&
  //                   calculateDateAfterOneYear(user?.subscriptionDate)}
  //               </td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //   </div>
  //   </>
  // );

  return (
    <>
<p className="text-2xl font-bold mb-4 ml-14 text-blue-600">Subscribed Users</p>

      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b font-medium border-slate-300">
          <tr>
            <th scope="col" className="px-6 py-4">
              Serial Number
            </th>
            <th scope="col" className="px-6 py-4">
              Subscriber Name
            </th>
            <th scope="col" className="px-6 py-4">
              subscribe date
            </th>
            <th scope="col" className="px-6 py-4">
              subscribe last date
            </th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter((user: any) => user?.isSubscribed)
            .map((user: any, index) => {
              return (
                <>
                  <tr
                    key={index}
                    className="border-b border-slate-300 bg-blue-300 text-center"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user?.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user?.subscriptionDate &&
                        convertToIndianTimeAndBeautify(user?.subscriptionDate)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user?.subscriptionDate &&
                        calculateDateAfterOneYear(user?.subscriptionDate)}
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
