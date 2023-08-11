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
      {users.map((user: any, index) => {
          return (
            <>
              <p>{user.isSubscribed && user.username}</p>
            </>
          );
      })}
    </>
  );
}
