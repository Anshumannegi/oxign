"use client";
import { useState, useEffect } from "react";
import axios from "axios";

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
        {users.map((user: any, index) => {
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
        })}
      </tbody>
    </>
  );
}
