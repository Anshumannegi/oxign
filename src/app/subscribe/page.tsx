"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

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
    const options: Intl.DateTimeFormatOptions =  {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return utcDate.toLocaleString('en-IN', options);
  }


  // function convertToIndianTimeAndBeautify(utcDateString: string) {
  //   const utcDate = new Date(utcDateString);
  //   const indianDate = utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  //   return format(parseInt(indianDate), 'yyyy-MM-dd HH:mm:ss');
  // }


  function calculateDateAfterOneYear(inputDate: any) {
    const date = new Date(inputDate);
    date.setFullYear(date.getUTCFullYear() + 1);
    return  convertToIndianTimeAndBeautify(date.toISOString());
  }

  return (
    <>
      <p>subscribe</p>
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
      </table>
      <tbody>
        {/* {users.map((user: any, index) => {
          if (user.isSubscribed) {
            return (
              <>
                <tr
                  key={user.index}
                  className="border-b border-slate-300 bg-blue-300"
                >
                   <td className="whitespace-nowrap px-6 py-4">
                    {index+1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.isSubscribed && user.username}
                  </td>
                </tr>
              </>
            );
          }
        })} */}

{users
  .filter((user: any) => user?.isSubscribed)
  .map((user: any, index) => (
    <tr
      key={index}
      className="border-b border-slate-300 bg-blue-300"
    >
      <td className="whitespace-nowrap px-6 py-4">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {user?.username}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {user?.subscriptionDate && convertToIndianTimeAndBeautify(user?.subscriptionDate)}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {user?.subscriptionDate && calculateDateAfterOneYear(user?.subscriptionDate) }
      </td>
    </tr>
  ))}
      </tbody>
    </>
  );
}
